import axios from 'axios';
import url from 'url';
import NodeCache from 'node-cache';
import { Request, Response } from 'express';

const cache = new NodeCache({ stdTTL: 300 });

const allowedDomainsAndPaths = [
  { domain: 'lynnux.xyz', ports: [80], paths: ['/anime', '/stats'] },
  { domain: '37.114.36.60', ports: [1031], paths: ['/botStats'] },
];

/**
 * Proxy endpoint handler.
 */
export const proxyRequest = async (req: Request, res: Response) => {
  const siteUrl = req.query.site as string;

  if (!siteUrl) {
    res.status(400).json({ error: 'Missing "site" query parameter' });
    return;
  }

  const parsedUrl = url.parse(siteUrl);
  const hostname = parsedUrl.hostname;
  const pathname = parsedUrl.pathname || '/';
  const port = parsedUrl.port || (parsedUrl.protocol === 'https:' ? '443' : '80');

  const isAllowed = allowedDomainsAndPaths.some((allowed) =>
    allowed.domain === hostname &&
    allowed.ports.includes(Number(port)) &&
    allowed.paths.some((allowedPath) => pathname.startsWith(allowedPath))
  );

  if (!isAllowed) {
    res.status(403).json({ error: 'Domain, port, or path not allowed' });
    return;
  }

  const cachedResponse = cache.get(siteUrl);
  if (cachedResponse) {
    res.json(cachedResponse);
    return;
  }

  try {
    const response = await axios.get(siteUrl);

    cache.set(siteUrl, response.data);

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data || 'Failed to fetch the requested site';
      res.status(statusCode).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
};

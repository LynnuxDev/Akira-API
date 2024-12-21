import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const roleplayDir = path.resolve(__dirname, '../../../data/roleplay/');

/**
 * Gets the value of the roleplay json if available and combines the url params.
 */
export const getRoleplayGif = (req: Request, res: Response) => {
  const { input } = req.params;
  const filePath = path.join(roleplayDir, `${input}.json`);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: `Endpoint Not Found.` });
    }

    try {
      const roleplayData = JSON.parse(data);

      if (!roleplayData.baseUrl || !roleplayData.basePath || !roleplayData.image || !Array.isArray(roleplayData.image)) {
        return res.status(400).json({ error: 'Invalid data structure in roleplay file.' });
      }

      const randomImage = roleplayData.image[Math.floor(Math.random() * roleplayData.image.length)];

      const imageUrl = `${roleplayData.baseUrl}${roleplayData.basePath}${randomImage}`;

      return res.json({
        embed: {
          title: `${input}-gif.gif`,
          description: "A gif provided by LynnuxDev!",
          image: {
            url: imageUrl,
          },
        },
      });
    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing JSON data.' });
    }
  });
};

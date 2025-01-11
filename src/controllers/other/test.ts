import { Request, Response } from 'express';

export const test = (req: Request, res: Response) => {
  console.log(req.headers)
  res.status(200).json({"request": "gotten"})
};
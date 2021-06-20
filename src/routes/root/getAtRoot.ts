import { Request, Response } from "express";
const getAtRoot = (req: Request, res: Response) => {
  res.send("<h1>Hello<h1>");
};
export default getAtRoot;

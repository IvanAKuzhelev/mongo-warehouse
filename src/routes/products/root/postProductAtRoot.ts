import { Request, Response } from "express";
const postProductAtRoot = (req: Request, res: Response) => {
  if (
    String(req.body.name) &&
    typeof req.body.price === "number" &&
    typeof req.body.count === "number"
  ) {
  } else {
  }
};
export default postProductAtRoot;

import product from "../../../createProductModel";
import { Request, Response } from "express";
const deleteProductAtId = (req: Request, res: Response) => {
  product
    .deleteOne({ _id: req.params.id }, (err) => {
      console.log(err);
    })
    .then(() => res.sendStatus(201));
};
export default deleteProductAtId;

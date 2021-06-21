import product from "../../../db/createProductModel";
import { IProduct } from "../../../db/createProductModel";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";
const getProductAtId = (req: Request, res: Response) => {
  console.log(req.params.id);
  product.findOne(
    { _id: req.params.id },
    (err: CallbackError, product: IProduct) => {
      if (err) console.log(err);
      if (product) {
        res.send(product);
        return;
      }
      res.sendStatus(404);
    }
  );
};
export default getProductAtId;

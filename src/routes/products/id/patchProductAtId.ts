import product from "../../../db/createProductModel";
import { IProduct } from "../../../db/createProductModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
interface patchReq extends Request {
  body: {
    name?: {
      old: string;
      new: string;
    };
    price?: {
      old: number;
      new: number;
    };
    count?: {
      old: number;
      new: number;
    };
  };
}
const patchProductAtId = (req: patchReq, res: Response) => {
  let pendingProduct: IProduct & mongoose.Document;
  product
    .findOne(
      { _id: req.params.id },
      (err: mongoose.CallbackError, product: IProduct & mongoose.Document) => {
        if (err) {
          throw err;
        }
        pendingProduct = product;
      }
    )
    .then(() => {
      if (!pendingProduct) {
        res.sendStatus(404);
        return;
      }
      console.log(req.body);
      if (req.body.name) {
        if (req.body.name.old === pendingProduct.name) {
          pendingProduct.name = req.body.name.new;
        } else {
          res.status(409);
          res.send(pendingProduct);
          return;
        }
      }
      if (req.body.price && req.body.price.old === pendingProduct.price) {
        if (
          req.body.price.old === pendingProduct.price &&
          req.body.price.new > 0
        ) {
          pendingProduct.price = req.body.price.new;
        } else {
          res.status(409);
          res.send(pendingProduct);
          return;
        }
      }
      if (req.body.count && req.body.count.old === pendingProduct.count) {
        if (req.body.count.old === pendingProduct.count && req.body.count.new) {
          pendingProduct.count = req.body.count.new;
        } else {
          res.status(409);
          res.send(pendingProduct);
          return;
        }

        pendingProduct.count = req.body.count.new;
      }
      pendingProduct.save((err, updatedProduct) => {
        if (err) {
          console.log(err);
        }
        res.send(updatedProduct);
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
export default patchProductAtId;

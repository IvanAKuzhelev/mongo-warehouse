import product from "../../../db/createProductModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { ObjectID } from "mongodb";
const deleteProductAtId = (req: Request, res: Response) => {
  product
    .findOneAndDelete({ _id: req.params.id }, {}, (err, prod) => {
      if (err) {
        console.log(err);
        return;
      }
      if (prod?.imageId) {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
        bucket.delete(new ObjectID(prod.imageId), (err) => console.log(err));
      }
    })
    .then(() => res.sendStatus(204));
};
export default deleteProductAtId;

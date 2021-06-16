import product from "./createProductModel";
import {Product} from "./createProductModel";
import express from "express";
const handleUpdate = (req: express.Request, res: express.Response) => {
  let pendingProduct: Product;
  product
    .find({ _id: req.params.id }, (err, product) => {
      if (err) console.log(err);
      [pendingProduct] = product;
    })
    .then(() => {
      const update: { name?: string; price?: number; count?: number } = {};
      console.log(req.body);
      if (req.body.name.new && req.body.name.old === pendingProduct.name) {
        update.name = req.body.name.new;
      }
      if (req.body.price.new && req.body.price.old === pendingProduct.price) {
        update.price = req.body.price.new;
      }
      if (req.body.count.new && req.body.count.old === pendingProduct.count) {
        update.count = req.body.count.new;
      }
      product.findOneAndUpdate(
        { _id: req.params.id },
        update,
        { new: true },
        (err, prod) => {
          if (err) {
            console.log(err);
          }
          res.send(prod);
        }
      );
    });
}
export default handleUpdate;
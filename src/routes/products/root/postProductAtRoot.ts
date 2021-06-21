import { Request, Response } from "express";
import product from "../../../db/createProductModel";
interface postReq extends Request {
  body: {
    name?: string;
    price?: number;
    count?: number;
  };
}
const postProductAtRoot = (req: postReq, res: Response) => {
  console.log(req.body);
  if (
    String(req.body.name) &&
    typeof req.body.price === "number" &&
    typeof req.body.count === "number"
  ) {
    product.create(
      { name: req.body.name, count: req.body.count, price: req.body.price },
      (err, newProduct) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.send(newProduct);
      }
    );
  } else {
    res.sendStatus(406);
  }
};
export default postProductAtRoot;

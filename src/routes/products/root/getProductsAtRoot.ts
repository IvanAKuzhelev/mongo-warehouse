import product from "../../../createProductModel";
import { IProduct } from "../../../createProductModel";
import { Request, Response } from "express";
const getProductsAtRoot = (req: Request, res: Response) => {
  const dbquery: {
    count?: { $gt: 0 };
    name?: { $regex: string; $options: string };
    price?: { $lt: number };
  } = {};
  const itemsPerPage = 25;
  if (req.query.present) {
    dbquery.count = { $gt: 0 };
  }
  if (req.query.search && typeof req.query.search == "string") {
    dbquery.name = { $regex: req.query.search, $options: "i" };
  }
  if (Number(req.query.maxprice)) {
    dbquery.price = { $lt: Number(req.query.maxprice) };
  }
  const data: { totalCount: number; items: IProduct[] } = {
    totalCount: 0,
    items: [],
  };
  const asyncDbquery = async () => {
    await product.countDocuments(dbquery, (err, docCount) => {
      console.log(docCount);
      data.totalCount = docCount;
      console.log(data);
    }),
      await product
        .find(dbquery, (err, products) => {
          if (err) console.log(err);

          data.items = products;
        })
        .sort({ price: -1, _id: 1 })
        .skip(
          Number(req.query.page) > 0
            ? (Number(req.query.page) - 1) * itemsPerPage
            : 0
        )
        .limit(itemsPerPage);
  };
  asyncDbquery().then(() => res.send(data));
};
export default getProductsAtRoot;

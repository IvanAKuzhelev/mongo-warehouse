import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import patchProductAtId from "./src/routes/products/id/patchProductAtId";
import getProductsAtRoot from "./src/routes/products/root/getProductsAtRoot";
import getProductAtId from "./src/routes/products/id/getProductAtId";
import deleteProductAtId from "./src/routes/products/id/deleteProductAtId";
import getAtRoot from "./src/routes/root/getAtRoot";
import getImageAtId from "./src/routes/images/id/getImageAtId";
import postProductAtRoot from "./src/routes/products/root/postProductAtRoot";
import postImageAtId from "./src/routes/images/id/postImageatId";
import upload from "./src/routes/images/multerUpload";

const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/warehouse", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB at the default address"))
  .catch((err) => console.log(err));

app.get("/", getAtRoot);

app.get("/products", getProductsAtRoot);
app.post("/products", postProductAtRoot);

app.get("/products/:id", getProductAtId);
app.patch("/products/:id", patchProductAtId);
app.delete("/products/:id", deleteProductAtId);
//image id
app.get("/images/:id", getImageAtId);
// product id
app.post("/images/:id", upload.single("image"), postImageAtId);

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

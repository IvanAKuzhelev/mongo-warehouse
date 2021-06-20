import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import patchProductAtId from "./src/routes/products/id/patchProductAtId";
import getProductsAtRoot from "./src/routes/products/root/getProductsAtRoot";
import getProductAtId from "./src/routes/products/id/getProductAtId";
import deleteProductAtId from "./src/routes/products/id/deleteProductAtId";
import getAtRoot from "./src/routes/root/getAtRoot";
import getImageAtId from "./src/routes/images/id/getImageAtId";

const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>
  console.log("connected to mongoDB at the default address")
);

app.get("/", getAtRoot);
app.get("/images/:id", getImageAtId);
app.get("/products", getProductsAtRoot);
app.get("/products/:id", getProductAtId);
app.patch("/products/:id", patchProductAtId);
app.post("/products");

app.delete("/products/:id", deleteProductAtId);
app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});

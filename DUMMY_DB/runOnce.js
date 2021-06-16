import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const { Schema } = mongoose;
const app = express();
const port = 3333;
app.use(cors());
const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  imageUrl: { type: String, required: false },
});
const product = mongoose.model("product", schema);
mongoose.connect("mongodb://localhost:27017/warehouse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {});
const dummy = Array.from({ length: 10000 }).map((_, index) => ({
  name: [
    `fruits ${Math.floor(Math.random() * 10000)}`,
    `vegetables ${Math.floor(Math.random() * 10000)}`,
    `milk ${Math.floor(Math.random() * 10000)}`,
    `meat ${Math.floor(Math.random() * 10000)}`,
  ][index % 4],
  price: Math.floor(Math.random() * 1000),
  count: Math.floor(Math.random() * 100),
}));
product.insertMany(dummy);

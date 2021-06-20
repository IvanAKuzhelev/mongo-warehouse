import mongoose from "mongoose";
const { Schema } = mongoose;
interface IProduct {
  name: string;
  price: number;
  count: number;
}
const schema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  imageUrl: { type: String, required: false },
});
const product = mongoose.model<IProduct>("product", schema);
mongoose.connect("mongodb://localhost:27017/warehouse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default product;
export { IProduct };

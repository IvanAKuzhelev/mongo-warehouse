import mongoose from "mongoose";
const { Schema } = mongoose;
interface IProduct {
  name: string;
  price: number;
  count: number;
  imageId?: string;
}
const schema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  count: { type: Number, required: true },
  imageId: { type: String, required: false },
});
const product = mongoose.model<IProduct>("product", schema);

export default product;
export { IProduct };

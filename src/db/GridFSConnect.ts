import mongoose from "mongoose";

const gridFSBucket = async () => {
  const conn = await mongoose.createConnection(
    "mongodb://localhost:27017/gfs",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );
  conn.once("connected", () => {
    console.log("grid");
  });
  const bucket = new mongoose.mongo.GridFSBucket(conn.db);
  return bucket;
};
// const writeStream = gridFSBucket.openUploadStream("test.dat");
export default gridFSBucket();

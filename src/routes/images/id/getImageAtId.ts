import { Request, Response } from "express";
import mongoose from "mongoose";
import { ObjectID } from "mongodb";
const getImageAtId = (req: Request, res: Response) => {
  const imageId = new ObjectID(req.params.id);
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
  const downloadStream = bucket.openDownloadStream(imageId);
  downloadStream.on("data", (chunk) => res.write(chunk));
  downloadStream.on("error", (err) => {
    console.log(err);
    res.sendStatus(404);
  });
  downloadStream.on("end", () => res.end());
};
export default getImageAtId;

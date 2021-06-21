import { Request, Response } from "express";
import fs from "fs";
import mongoose from "mongoose";
import product from "../../../db/createProductModel";

const postImageAtId = async (req: Request, res: Response) => {
  if (req.file) {
    console.log(req.file.path);
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    const uploadStream = bucket.openUploadStream(req.file.filename);

    const imageId = uploadStream.id;
    fs.createReadStream(req.file.path).pipe(uploadStream);
    uploadStream.on("error", (err) => console.log(err));
    uploadStream.on("finish", () => console.log("file uploaded"));

    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
    });

    product.updateOne(
      { _id: req.params.id },
      { imageId: String(imageId) },
      {},
      (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(res);
      }
    );
    res.sendStatus(201);
  }
};

export default postImageAtId;

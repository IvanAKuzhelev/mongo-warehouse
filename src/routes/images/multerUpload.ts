import multer from "multer";
const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, req.params.id + file.originalname);
  },
});
const upload = multer({ storage: tempStorage });
export default upload;

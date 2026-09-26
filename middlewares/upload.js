import multer from "multer";

// we use our computer's memory
const storage = multer.memoryStorage();

// bu middleware this appload ayuu noosamaynaa
export const upload = multer({
    storage,
    limits: { fieldSize: 10 * 1024 * 1024} // 10 MB
})
// wuxu so celinaa= fieldname,originalname, encoding, mimetype,buffer and size.
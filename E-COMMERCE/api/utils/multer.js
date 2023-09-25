import multer from "multer";

//multer storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.round(Math.random() + 1000000) + file.fieldname);
  },
});

// multer for brand logo
export const profilePhoto = multer({ storage }).single("profilePhoto");
export const brandLogo = multer({ storage }).single("brandPhoto");
export const categoryLogo = multer({ storage }).single("catPhoto");
export const productPhotos = multer({ storage }).array("productPhotos");

import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload folders if they don't exist
const createFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

createFolder("uploads/profile");
createFolder("uploads/cover");

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profile") {
      cb(null, "uploads/profile");
    } else if (file.fieldname === "cover") {
      cb(null, "uploads/cover");
    } else {
      cb(null, "uploads"); // fallback
    }
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + unique + ext);
  },
});

export const upload = multer({ storage });

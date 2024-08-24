// import multer from "multer";
// import path from "path";

// // Use __dirname to get the current directory path
// const storage = multer.diskStorage({
  
  
//   destination: function (req, file, cb) {
//     console.log(path.join(__dirname, '..', 'uploads'))
//     cb(null, path.join(__dirname, '..', 'uploads')); // Adjust path to your project structure
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix);
//   }
// });

// export const upload = multer({ storage: storage });


import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory name from the current module URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(__dirname);
    console.log(__filename);
  console.log(join(__dirname, '..', './uploads'));
  
    
    cb(null, join(__dirname, '..', 'uploads')); // Use path.join with __dirname
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+ file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

export const upload = multer({ storage: storage });

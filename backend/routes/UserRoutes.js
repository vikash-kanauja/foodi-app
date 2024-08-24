import express from "express";
import { upload } from "../config/multer.js";
// import { deleteUser, getuser } from '../controllers/Admin.js'
// import isAdmin from '../middleware/verifyToken.js'

const UserRoutes = express.Router();
// AdminRoutes.get('/getuser', isAdmin , getuser)
UserRoutes.post("/profile", upload.single("file"), (req, res) => {
  // Handle the uploaded file
  // console.log(req.file)
  res.json({ message: "File uploaded successfully!" });
});

export default UserRoutes;

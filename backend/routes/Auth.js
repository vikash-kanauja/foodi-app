import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/Auth.js";
import { authenticateToken } from "../middleware/verify.js";
const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", login);
AuthRoutes.post("/logout", logout);
AuthRoutes.post("/forgot-password", forgotPassword);
AuthRoutes.post("/reset-password", resetPassword);

AuthRoutes.get("/verify", authenticateToken, (req, res) => {
  res.json(req.user);
});

export default AuthRoutes;

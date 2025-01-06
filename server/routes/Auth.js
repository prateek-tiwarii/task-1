import express from "express";
import { verifyToken } from "../controllers/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.post("/verify", verifyToken, (req, res) => {  
    res.status(200).json({ success: true, message: 'Token verified successfully',user: req.user, });
  });
  
AuthRouter.get("/test", (req, res) => {
    res.json({
        message: "Auth route works"
    })
})


export  default AuthRouter;
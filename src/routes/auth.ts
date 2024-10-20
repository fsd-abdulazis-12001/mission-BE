import { Router } from "express";
import { login, signup, me, googleLoginCallBack, verifyEmail, updateProfile } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middleware/auth";

const authRouter:Router = Router();

authRouter.post('/updateProfile', [authMiddleware as any], errorHandler(updateProfile));
authRouter.get('/verify-email', errorHandler(verifyEmail));
authRouter.post("/google/callback", errorHandler(googleLoginCallBack));
authRouter.post("/signup", errorHandler(signup));
authRouter.post("/signin", errorHandler(login));
authRouter.get("/me", [authMiddleware as any], errorHandler(me));

export default authRouter
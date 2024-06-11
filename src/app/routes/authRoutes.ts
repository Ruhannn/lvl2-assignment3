import { Router } from "express";
import { login, signup, test } from "../controllers/authController";

const router = Router();

router.get("/test", test);
router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);

export default router;

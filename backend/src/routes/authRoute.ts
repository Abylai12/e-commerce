import { Router } from "express";
import { login, logup, verifyUserEmail } from "../controllers/auth-controller";

const router = Router();
router.route("/login").post(login);
router.route("/logup").post(logup);
router.route("/verify/email").post(verifyUserEmail);
export default router;

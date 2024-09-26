import { Router } from "express";
import { login, logup, verifyUserEmail } from "../controllers/auth-controller";
import { auth } from "../middlewares/authentication";

const router = Router();
router.route("/login").post(login);
router.route("/logup").post(logup);
router.route("/verify/email").post(auth, verifyUserEmail);
export default router;

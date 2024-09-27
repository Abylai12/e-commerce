import { Router } from "express";
import {
  login,
  logup,
  verifyUserEmail,
  verifyUserOtp,
  verifyUserPassword,
} from "../controllers/auth-controller";
import { auth } from "../middlewares/authentication";

const router = Router();
router.route("/login").post(login);
router.route("/logup").post(logup);
router.route("/verify/email").post(verifyUserEmail);
router.route("/verify/otp").post(verifyUserOtp);
router.route("/verify/password").post(verifyUserPassword);
export default router;

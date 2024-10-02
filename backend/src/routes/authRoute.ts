import { Router } from "express";
import {
  getCurrentUser,
  getUserData,
  login,
  logup,
  updateUserInfo,
  verifyUserEmail,
  verifyUserOtp,
  verifyUserPassword,
} from "../controllers/auth-controller";
import { auth } from "../middlewares/authentication";

const router = Router();
router.route("/login").post(login).get(auth, getCurrentUser);
router.route("/profile").get(auth, getCurrentUser);
router.route("/update.user").get(auth, getUserData);
router.route("/logup").post(logup);
router.route("/verify/email").post(verifyUserEmail);
router.route("/verify/otp").post(verifyUserOtp);
router.route("/verify/password").post(verifyUserPassword);
router.route("/update/info").post(auth, updateUserInfo);
export default router;

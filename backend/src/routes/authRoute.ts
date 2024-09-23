import { Router } from "express";
import { login, logup } from "../controllers/auth-controller";

const router = Router();
router.route("/login").post(login);
router.route("/logup").post(logup);
export default router;

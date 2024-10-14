import { Router } from "express";
import { createPackCart } from "../controllers/cart-controller";
import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/create/product/cart").post(auth, createPackCart);
router.route("/save/product/delete").post(auth);

export default router;

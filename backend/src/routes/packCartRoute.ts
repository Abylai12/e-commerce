import { Router } from "express";
import { createPackCart, getPackCart } from "../controllers/cart-controller";
import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/create/product/cart").post(auth, createPackCart);
router.route("/pack/product").get(auth, getPackCart);
router.route("/save/product/delete").post(auth);

export default router;

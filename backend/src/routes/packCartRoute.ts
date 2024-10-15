import { Router } from "express";
import {
  createPackCart,
  getPackCart,
  updateCartProduct,
} from "../controllers/cart-controller";
import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/create/product/cart").post(auth, createPackCart);
router.route("/pack/product").get(auth, getPackCart);
router.route("/update/cart/product").put(auth, updateCartProduct);

export default router;

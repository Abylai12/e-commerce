import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product-controller";

const router = Router();

router.route("/product").post(createProduct);
router.route("/get/products").get(getAllProducts);

export default router;

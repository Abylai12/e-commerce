import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsWithSearch,
  getProductDetail,
} from "../controllers/product-controller";

const router = Router();

router.route("/create/product").post(createProduct);
router.route("/get/product").get(getAllProducts);
router.route("/get/products/search").post(getAllProductsWithSearch);
router.route("/get/product/detail").post(getProductDetail);

export default router;

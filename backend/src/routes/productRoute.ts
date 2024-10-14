import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsWithSearch,
  getProductDetail,
} from "../controllers/product-controller";
import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/create/product").post(createProduct);
router.route("/get/product").get(getAllProducts);

router.route("/get/products/search").post(getAllProductsWithSearch);
router.route("/get/product/detail/:id").get(getProductDetail);

export default router;

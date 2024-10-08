import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category-controller";

const router = Router();

router.route("/category").post(createCategory).get(getAllCategories);

export default router;

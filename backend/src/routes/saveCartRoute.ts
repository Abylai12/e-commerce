import { Router } from "express";
import {
  createSaveCart,
  deleteSaveProduct,
  getSaveCart,
} from "../controllers/save-controller";
import { auth } from "../middlewares/authentication";

const router = Router();

router.route("/save/product").get(auth, getSaveCart).post(auth, createSaveCart);
router.route("/save/product/delete").post(auth, deleteSaveProduct);

export default router;

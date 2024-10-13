import { Router } from "express";
import {
  getAllComments,
  createComment,
} from "../controllers/comment-controller";

const router = Router();

router.route("/user/comment/:id").get(getAllComments);
router.route("/user/comment").post(createComment);

export default router;

import { Request, Response } from "express";
import Comment from "../models/comment.model";

export const postComment = async (req: Request, res: Response) => {
  const { commentForm, product_id } = req.body;
  const { userName, description, rating } = commentForm;
  try {
    const findComment = await Comment.findOne({ product_id });
    if (!findComment) {
      const comment = await Comment.create({
        product_id: product_id,
        comments: { userName, description, rating },
      });
      return res.status(200).json({
        message: "created new cart",
        comment,
      });
    } else {
      findComment.comments.push({ userName, description, rating });
    }
    const updatedComment = await findComment.save();
    res.status(200).json({
      message: "updated cart",
      updatedComment,
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};

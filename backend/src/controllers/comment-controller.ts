import { Request, Response } from "express";
import Comment from "../models/comment.model";

export const createComment = async (req: Request, res: Response) => {
  const { commentForm, id } = req.body;

  const { userName, description, rating } = commentForm;
  try {
    const findComment = await Comment.findOne({ product_id: id });
    if (!findComment) {
      const comment = await Comment.create({
        product_id: id,
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

export const getAllComments = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await Comment.findOne({ product_id: id });
    const comments = data?.comments;
    const length = comments?.length;

    let sum = 0;
    let num = 0;
    comments?.forEach(({ rating }) => {
      if (rating > 0) {
        sum += rating;
        num += 1;
      }
    });

    const ratingAVG = Math.ceil(sum / num);

    res.status(200).json({ message: "success", comments, ratingAVG, length });
  } catch (error) {
    res.status(401).json({ error: "Failed to retrieve products" });
    console.error(error);
  }
};

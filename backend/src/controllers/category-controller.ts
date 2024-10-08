import { Request, Response } from "express";
import Category from "../models/category.model";

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }
    const category = await Category.create({ name, description });
    console.log("category", name);

    res.status(200).json({ message: "success", category });
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ message: "success", categories });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

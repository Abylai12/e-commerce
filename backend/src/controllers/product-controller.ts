import { Request, Response } from "express";
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    size,
    images,
    isNew,
    quantity,
    discount,
    category,
  } = req.body;
  try {
    if (!name || !description) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }
    const product = await Product.create({
      name,
      description,
      price,
      size,
      images,
      isNew,
      quantity,
      discount,
      category,
    });
    res.status(200).json({ message: "success", product });
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find().populate("category");
    res.status(200).json({ message: "success", product });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

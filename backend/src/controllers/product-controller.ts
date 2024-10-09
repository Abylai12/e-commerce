import { Request, Response } from "express";
import Product from "../models/product.model";
import Category from "../models/category.model";

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
    const products = await Product.find().populate("category").limit(18);
    const product = await Product.find().sort({ createdAt: -1 }).limit(1);
    const categories = await Category.find();
    res.status(200).json({ message: "success", products, categories, product });
  } catch (error) {
    res.status(401).json({ error });
    console.error(error);
  }
};

export const getAllProductsWithSearch = async (req: Request, res: Response) => {
  const { category, size, name } = req.body;

  try {
    const query: any = {};
    if (category) query.category = category;
    if (size) query.size = size;
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    const products = await Product.find(query).populate("category");
    const lastProduct = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category")
      .limit(1);
    res.status(200).json({ message: "success", products, lastProduct });
  } catch (error) {
    res.status(401).json({ error: "Failed to retrieve products" });
    console.error(error);
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cat_id } = req.query;
  // localhost:8000/api/v1/productid?categoryId={categoryId}
  try {
    const productDetail = await Product.find({ _id: id });
    const products = await Product.find({ cat_id }).limit(8);
    res.status(200).json({ message: "success", productDetail, products });
  } catch (error) {
    res.status(401).json({ error: "Failed to retrieve products" });
    console.error(error);
  }
};

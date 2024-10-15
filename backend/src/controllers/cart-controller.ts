import { Request, Response } from "express";
import PackProduct from "../models/packProduct.model";

export const createPackCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { product_id, quantity, size } = req.body;
  console.log("size", size);
  try {
    const findSave = await PackProduct.findOne({ user_id: id });
    if (!findSave) {
      const data = await PackProduct.create({
        user_id: id,
        products: { product_id, quantity, size },
      });
      return res.status(200).json({
        message: "created new cart",
        data,
      });
    }
    const findDuplicated = findSave.products.filter(
      (item) => item.product_id.toString() === product_id
    );

    console.log("duplicat", findDuplicated);

    if (findDuplicated.length > 0) {
      const findSize = findDuplicated.some((item) => item.size === size);
      if (findSize) {
        res.status(201).json({ message: "хэмжээ давхацаж байна" });
        return;
      }
    }
    findSave.products.push({ product_id, quantity, size });

    const updatedData = await findSave.save();
    res.status(200).json({
      message: "updated cart",
      updatedData,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getPackCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const findSave = await PackProduct.findOne({ user_id: id }).populate(
      "products.product_id"
    );

    const products = findSave?.products;
    res.status(200).json({
      message: "success",
      products,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

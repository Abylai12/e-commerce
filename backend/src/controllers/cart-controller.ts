import { Request, Response } from "express";
import PackProduct from "../models/packProduct.model";

export const createPackCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { product_id, quantity, size } = req.body;
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
    const findDuplicated = findSave.products.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (findDuplicated > -1) {
      res.status(201).json({ message: "хадгалсан бараа байна" });
      return;
    } else {
      findSave.products.push({ product_id, quantity, size });
    }
    const updatedData = await findSave.save();
    res.status(200).json({
      message: "updated cart",
      updatedData,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

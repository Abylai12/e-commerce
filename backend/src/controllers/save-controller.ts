import { Request, Response } from "express";
import SaveProduct from "../models/save.model";

export const createSaveCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { product_id } = req.body;

  try {
    const findSave = await SaveProduct.findOne({ user_id: id });
    console.log(findSave);
    if (!findSave) {
      const data = await SaveProduct.create({
        user_id: id,
        products_id: { product_id },
      });
      return res.status(200).json({
        message: "created new cart",
        data,
      });
    }

    const findDuplicated = findSave.products_id.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (findDuplicated > -1) {
      res.status(201).json({ message: "хадгалсан бараа байна" });
      return;
    } else {
      findSave.products_id.push({ product_id });
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

export const getSaveCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const findSave = await SaveProduct.findOne({ user_id: id });
    const ids = findSave?.products_id;
    res.status(200).json({
      message: "success",
      ids,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const deleteSaveProduct = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { product_id } = req.body;

  try {
    // Find the user's saved products and remove the specified product_id
    const updatedSave = await SaveProduct.findOneAndUpdate(
      { user_id: id },
      { $pull: { products_id: { product_id } } }, // Use $pull to remove the product_id
      { new: true } // Return the updated document
    );

    if (!updatedSave) {
      return res.status(404).json({ message: "No saved products found for this user." });
    }

    res.status(200).json({
      message: "Product successfully removed.",
      updatedSave,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product." });
  }
};
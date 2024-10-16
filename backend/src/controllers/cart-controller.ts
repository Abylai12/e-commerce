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
    const totalAmount = products?.reduce((total: number, item: any) => {
      const price = item.product_id.price;
      const discount = item.product_id.discount;
      const quantity = item.quantity;
      return total + price * (1 - discount / 100) * quantity;
    }, 0);

    res.status(200).json({
      message: "success",
      products,
      totalAmount,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateCartProduct = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { cart_id, sizeUpdate, count } = req.body;
  console.log(cart_id, sizeUpdate, count);
  try {
    const findSave = await PackProduct.findOne({ user_id: id });
    if (!findSave) {
      return res.status(400).json({ message: "hereglegch oldsongui" });
    }

    const products = findSave?.products;
    const findIndex = products?.findIndex(
      (item) => item._id?.toString() === cart_id
    );
    if (findIndex === -1) {
      return res.status(400).json({ message: "baraa oldsongui" });
    }
    console.log("findIndex", findIndex);

    if (products[findIndex].size === sizeUpdate) {
      products.splice(findIndex, 1);
      await findSave.save();
      return res.status(400).json({ message: "baraanii hemjee davhatsaj bn" });
    }
    products[findIndex].size === sizeUpdate;
    products[findIndex].quantity = count;

    const updatedData = await findSave.save();
    res.status(200).json({
      message: "success",
      updatedData,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteCartProduct = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { cart_id } = req.params;
  console.log(cart_id);
  try {
    const findSave = await PackProduct.findOne({ user_id: id });
    if (!findSave) {
      return res.status(400).json({ message: "hereglegch oldsongui" });
    }
    const products = findSave?.products;
    const findIndex = products?.findIndex(
      (item) => item._id?.toString() === cart_id
    );
    if (findIndex === -1) {
      return res.status(400).json({ message: "baraa oldsongui" });
    }
    products.splice(findIndex, 1);

    const updatedData = await findSave.save();
    res.status(200).json({
      message: "success",
      updatedData,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

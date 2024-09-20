import { Request, Response } from "express";
import User from "../models/user.model";

export const login = async (req: Request, res: Response) => {
  // const { email, password } = req.body;
  res.status(200).json({ message: "success" });

  // try {
  //     const data = await
  // } catch (error) {

  // }
};

export const logup = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }
    const createdUser = await User.create({
      name,
      email,
      password,
      phoneNumber: "",
    });

    res.status(200).json({ message: "success", user: createdUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

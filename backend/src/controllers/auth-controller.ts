import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("user", email);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Not found user" });
    } else {
      const isCheck = bcrypt.compareSync(password, user.password);
      if (!isCheck) {
        res.status(400).json({ message: "Not match user email or password" });
      } else {
        const token = jwt.sign({ id: user.id }, "JWT_TOKEN_PASS1234", {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "success", token });
      }
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const logup = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }

    // console.log("first", hashedPassword);
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(200).json({ message: "success", user: createdUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

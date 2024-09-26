import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { generateGmail } from "../utils/sentGmail";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("user", email);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "Not found user" });
    } else {
      const isCheck = bcrypt.compareSync(password, user.password);
      if (!isCheck) {
        res.status(400).json({ message: "Not match user email or password" });
      } else {
        const token = generateToken({ id: user.id });
        res.status(200).json({ message: "success", token, user });
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

export const verifyUserEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("user", email);
    if (!user) {
      res.status(400).json({ message: "Not found user" });
    } else {
      const rndOtp = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(4, "0");
      const { email } = user;
      generateGmail(email.toString(), rndOtp);
      user.otp = rndOtp;
      await user.save();
      res.status(200).json({ message: "success", email });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const verifyUserOtp = async (req: Request, res: Response) => {
  const { otpEmail } = req.body;
  const { email, otp } = otpEmail;
  try {
    const findUser = await User.find({ email, otp });
    console.log("user", user);
    if (!findUser) {
      res.status(400).json({ message: "Not found user" });
    } else {
      const { email, otp } = findUser;
      generateGmail(email.toString(), otp);

      res.status(200).json({ message: "success", email });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

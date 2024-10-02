import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import { generateGmail, sendEmailWithLink } from "../utils/sentGmail";
import crypto from "crypto";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Not found user" });
    }
    const isCheck = bcrypt.compareSync(password, user.password);
    if (!isCheck) {
      res.status(402).json({ message: "Not match user email or password" });
    } else {
      const token = generateToken({ id: user.id });
      const { email, profile_img, firstName, lastName } = user;

      res.status(200).json({
        message: "success",
        token,
        user: { email, profile_img, firstName, lastName },
      });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Not found user" });
    }
    const { email, profile_img, firstName, lastName } = user;
    res.status(200).json({
      message: "success",
      user: { email, profile_img, firstName, lastName },
    });
  } catch (error) {
    res.status(401).json({ error });
  }
};
export const getUserData = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Not found user" });
    }
    const { email, profile_img, firstName, lastName } = user;
    res.status(200).json({
      message: "success",
      user: { email, profile_img, firstName, lastName },
    });
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
    res.status(400).json({ message: error });
  }
};
export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const { email, firstName, lastName, phoneNumber, address } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber || !address) {
      return res.status(400).json({ message: " Хоосон утга байж болохгүй" });
    }
    // const id = { _id: id };

    const update = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    };
    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200).json({ message: "success", updatedUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const verifyUserEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(400).json({ message: "Not found user" });
    } else {
      const rndOtp = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      generateGmail(email, rndOtp);
      findUser.otp = rndOtp;
      await findUser.save();
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const verifyUserOtp = async (req: Request, res: Response) => {
  const { otp, email } = req.body;
  try {
    const findUser = await User.findOne({ email, otp });
    // console.log("user", user);
    if (!findUser) {
      return res.status(400).json({
        message: "Бүртгэлтэй хэрэглэгч эсвэл OTP код олдсонгүй",
      });
    }

    //sendEmail
    const resetToken = crypto.randomBytes(25).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    findUser.passwordResetToken = hashedResetToken;
    findUser.passwordResetTokenExpire = new Date(Date.now() + 10 * 60 * 1000);
    await findUser.save();
    await sendEmailWithLink(email, resetToken);
    res.status(200).json({ message: "Нууц үг сэргээх имэйл илгээлээ" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

export const verifyUserPassword = async (req: Request, res: Response) => {
  const { password, resetToken } = req.body;
  try {
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const findUser = await User.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetTokenExpire: { $gt: Date.now() },
    });
    console.log("user", findUser);

    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Таны нууц үг сэргээх хугацаа дууссан байна:" });
    }

    findUser.password = password;
    await findUser.save();
    res.status(200).json({ message: "Нууц үг  амжилттэй сэргээлээ" });
  } catch (error) {
    res.status(401).json({ error });
  }
};

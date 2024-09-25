import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import catRoute from "./routes/categoryRoute";
import productRoute from "./routes/productRoute";
import { connectDB } from "./config/db";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";
// express s application uusenguud teriig n app gej nerlej avch bgaa
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.email",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "abilay1208@gmail.com",
      pass: "lrjf uccn xnec zlyr",
    },
  });

  const info = await transporter.sendMail({
    from: "abilay1208@gmail.com>", // sender address
    to: "baljinnym1318@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello baljka bro</b>", // html body
  });
  res.send("Welcome E-commerce API Server");
  //localhost:8000/
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", catRoute);
app.use("/api/v1", productRoute);
connectDB(MONGO_URI);

app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа`);
});

// const rndOtp = Math.floor(Math.random() * 1000)
// .toString()
// .padStart(4, "0");
// const { data, error } = await resend.emails.send({
// from: "Acme <onboarding@resend.dev>",
// to: ["abilay1208@gmail.com"],
// subject: "hello world",
// html: generateTemplate(rndOtp),
// });
// if (error) {
// console.error("email_err", { error });
// }

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import catRoute from "./routes/categoryRoute";
import productRoute from "./routes/productRoute";
import { connectDB } from "./config/db";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";
// express s application uusenguud teriig n app gej nerlej avch bgaa
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
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

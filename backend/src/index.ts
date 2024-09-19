import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";

dotenv.config();

const PORT = process.env.PORT;
// express s application uusenguud teriig n app gej nerlej avch bgaa
const app = express();

// middlewares
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome E-commerce API Server");
  //localhost:8000/
});

app.use("/api/v1/auth", authRoute);
console.log("type", typeof app);

app.listen(PORT, () => {
  console.log(`Сервер localhost:${PORT} дээр аслаа`);
});

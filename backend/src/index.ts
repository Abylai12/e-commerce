import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import catRoute from "./routes/categoryRoute";
import productRoute from "./routes/productRoute";
import commentRoute from "./routes/commentRoute";
import saveProductRoute from "./routes/saveCartRoute";
import packProductRoute from "./routes/packCartRoute";
import { connectDB } from "./config/db";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || "";
const MONGO_URI = process.env.MONGO_URI || "";

// Express app initialization
const app = express();

// CORS Configuration
const allowedOrigins = [
  "https://e-commerce-5uub.vercel.app",
  "https://another-frontend-url.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// Route handlers
app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome E-commerce API Server");
});

// Define routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", catRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", commentRoute);
app.use("/api/v1", saveProductRoute);
app.use("/api/v1", packProductRoute);

// Connect to database
connectDB(MONGO_URI);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

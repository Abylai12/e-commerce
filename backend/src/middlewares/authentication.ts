import { Request, Response, NextFunction } from "express";
import { DecodeToken } from "../utils/decodeToken";

// interface IMyRequest extends Request {
//   user: string | object;
// }
declare global {
  namespace Express {
    interface Request {
      user: string | any;
    }
  }
}
export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Та энэ үйлдлийг хийхийн тулд нэвтэрнэ үү" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = DecodeToken(token);
  req.user = user;
  next();
};

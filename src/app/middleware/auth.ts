import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const JWT_token = config.jwt_secret as string ;
if (!JWT_token) {
  throw new Error("jwt token not found");
}
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_token);
    // @ts-expect-error : ignore ts error
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, statusCode: 401, message: "Invalid token" });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error : ignore ts error
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, statusCode: 403, message: "Access denied" });
  }
  next();
};

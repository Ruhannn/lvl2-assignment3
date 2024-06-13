import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error : ignore ts error
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, statusCode: 403, message: "Access denied" });
  }
  next();
};

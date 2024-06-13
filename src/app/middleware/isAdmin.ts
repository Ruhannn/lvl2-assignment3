import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error : ignore ts error
  if (req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "You have no access to this route",
    });
  }
  next();
};

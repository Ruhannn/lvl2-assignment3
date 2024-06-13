import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import config from "../config";
import { userValidationSchema } from "../validation/validation";
const JWT_token = config.jwt_secret as string;
if (!JWT_token) {
  throw new Error("jwt token not found");
}
// user sign up
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    const validationResult = userValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: validationResult.error.errors,
      });
    }

    const user = new User({ name, email, password, phone, address, role });
    await user.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};
// user login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        sub: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
      JWT_token,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};
export const test = async (req: Request, res: Response) => {
  res.json({
    test: true,
  });
};

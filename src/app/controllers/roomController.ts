import { Request, Response } from "express";
import Room from "../models/Room";
import handleNoDataFound from "../middleware/handleNoDataFound";
import { roomValidationSchema } from "../validation/validation";

// create room
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, roomNo, floorNo, capacity, pricePerSlot, amenities } =
      req.body;
    const validationResult = roomValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: validationResult.error.errors,
      });
    }
    const room = new Room({
      name,
      roomNo,
      floorNo,
      capacity,
      pricePerSlot,
      amenities,
    });
    await room.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room added successfully",
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// get a room
export const getRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room retrieved successfully",
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// Get All Rooms
export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({ isDeleted: false });

    res.status(200).json(handleNoDataFound(rooms, "Rooms"));
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// update room
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room updated successfully",
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// delete room
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!room) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Room deleted successfully",
      data: room,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

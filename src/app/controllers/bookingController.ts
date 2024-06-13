import { Request, Response } from "express";
import Booking from "../models/Booking";
import Slot from "../models/Slot";
import Room from "../models/Room";
import handleNoDataFound from "../middleware/handleNoDataFound";
import { bookingValidationSchema } from "../validation/validation";

// create booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { date, slots, room, user } = req.body;
    const validationResult = bookingValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: validationResult.error.errors,
      });
    }
    const invalidSlots = await Slot.find({
      _id: { $in: slots },
      isBooked: true,
    });
    if (invalidSlots.length > 0) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Some slots are already booked",
      });
    }

    const roomDetails = await Room.findById(room);
    if (!roomDetails) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Room not found",
      });
    }
    const totalAmount = roomDetails.pricePerSlot * slots.length;

    const booking = new Booking({
      date,
      slots,
      room,
      user,
      totalAmount,
      isConfirmed: "unconfirmed",
    });
    await booking.save();

    await Slot.updateMany({ _id: { $in: slots } }, { isBooked: true });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("slots")
      .populate("room")
      .populate({
        path: "user",
        select: "-password",
      });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking created successfully",
      data: populatedBooking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate("slots")
      .populate("room")
      .populate({
        path: "user",
        select: "-password",
      });
    res.status(200).json(handleNoDataFound(bookings, "All bookings"));
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// get user's bookings
export const getUserBookings = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const userId = (req as any).user._id;
    const bookings = await Booking.find({
      user: userId,
    })
      .select("-user")
      .populate("slots")
      .populate("room");

    res.status(200).json(handleNoDataFound(bookings, "User bookings"));
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// update booking
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const booking = await Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("_id date slots totalAmount room user isConfirmed isDeleted");

    if (!booking) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// delete booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).select("_id date slots totalAmount room user isConfirmed isDeleted");

    if (!booking) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Booking deleted successfully",
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

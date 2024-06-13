import { Request, Response } from "express";
import Slot from "../models/Slot";
import Room from "../models/Room";
import handleNoDataFound from "../middleware/handleNoDataFound";
import { slotValidationSchema } from "../validation/validation";
import { format, parse } from "date-fns";
// create slots
export const createSlots = async (req: Request, res: Response) => {
  try {
    const { room, date, startTime, endTime } = req.body;
    const validationResult = slotValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: validationResult.error.errors,
      });
    }
    const roomDoc = await Room.findById(room);
    if (!roomDoc) {
      return res
        .status(404)
        .json({ success: false, statusCode: 404, message: "Room not found" });
    }

    const slotsData = [];
    const slotDuration = 60;
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const totalDuration = endMinutes - startMinutes;
    const numberOfSlots = Math.floor(totalDuration / slotDuration);

    for (let i = 0; i < numberOfSlots; i++) {
      const newStartTime = minutesToTime(startMinutes + i * slotDuration);
      const newEndTime = minutesToTime(startMinutes + (i + 1) * slotDuration);
      const slot = new Slot({
        room,
        date,
        startTime: newStartTime,
        endTime: newEndTime,
      });
      await slot.save();
      slotsData.push(slot);
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Slots created successfully",
      data: slotsData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

// get available slots
export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { date, roomId } = req.query;
    // TODO: add "isDeleted": false is rooms
    const filter: any = { isBooked: false };
    if (date) filter.date = date;
    if (roomId) filter.room = roomId;

    const slots = await Slot.find(filter).populate(
      "room",
      "name roomNo floorNo capacity pricePerSlot amenities"
    );

    res.status(200).json(handleNoDataFound(slots, "Available slots"));
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: (error as Error).message,
    });
  }
};

//  convert time
const timeToMinutes = (time: string) => {
  const parsedTime = parse(time, "HH:mm", new Date());
  return parsedTime.getHours() * 60 + parsedTime.getMinutes();
};

//  convert minutes
const minutesToTime = (minutes: number) => {
  const date = new Date(0, 0, 0, Math.floor(minutes / 60), minutes % 60);
  return format(date, "HH:mm");
};

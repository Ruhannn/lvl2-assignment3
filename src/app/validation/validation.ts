import { z } from "zod";
const userValidationSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10).max(15),
  address: z.string().min(5),
  role: z.enum(["user", "admin"]),
});
const slotValidationSchema = z.object({
  room: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  isBooked: z.boolean().optional(),
});
const roomValidationSchema = z.object({
  name: z.string().min(1),
  roomNo: z.number().int().positive(),
  floorNo: z.number().int().positive(),
  capacity: z.number().int().positive(),
  pricePerSlot: z.number().positive(),
  amenities: z.array(z.string()).optional(),
  isDeleted: z.boolean().optional(),
});
const bookingValidationSchema = z.object({
  date: z.string(),
  slots: z.array(z.string()),
  room: z.string(),
  user: z.string(),
  isDeleted: z.boolean().optional(),
});
export {
  userValidationSchema,
  slotValidationSchema,
  roomValidationSchema,
  bookingValidationSchema,
};

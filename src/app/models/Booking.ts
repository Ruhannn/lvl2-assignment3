import { Schema, model, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface IBooking extends Document {
  room: ObjectId;
  slots: ObjectId[];
  user: ObjectId;
  totalAmount: number;
  isConfirmed: boolean;
}

const BookingSchema = new Schema<IBooking>({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: { type: Boolean, default: false },
});

const Booking = model<IBooking>("Booking", BookingSchema);

export default Booking;

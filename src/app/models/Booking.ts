import { Schema, model, Document } from "mongoose";

interface IBooking extends Document {
  date: Date;
  slots: Schema.Types.ObjectId[];
  room: Schema.Types.ObjectId; 
  user: Schema.Types.ObjectId;
  totalAmount: number;
  isConfirmed: string;
  isDeleted: boolean;
}

const BookingSchema = new Schema<IBooking>({
  date: { type: Date, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalAmount: { type: Number, required: true },
  isConfirmed: {
    type: String,
    enum: ["confirmed", "unconfirmed"],
    default: "unconfirmed",
  },
  isDeleted: { type: Boolean, default: false },
});

const Booking = model<IBooking>("Booking", BookingSchema);

export default Booking;

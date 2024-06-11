import { Schema, model, Document } from "mongoose";
import { ObjectId } from "mongodb";

interface ISlot extends Document {
  room: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const SlotSchema = new Schema<ISlot>({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

const Slot = model<ISlot>("Slot", SlotSchema);

export default Slot;

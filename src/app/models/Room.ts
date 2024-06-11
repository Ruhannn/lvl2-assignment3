import { Schema, model, Document } from "mongoose";

interface IRoom extends Document {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  roomNo: { type: Number, required: true, unique: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  isDeleted: { type: Boolean, default: false },
});

const Room = model<IRoom>("Room", RoomSchema);

export default Room;

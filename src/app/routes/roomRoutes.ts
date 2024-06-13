import { Router } from "express";
import {
  createRoom,
  getRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController";
import { authenticate,  } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.post("/api/rooms", authenticate, isAdmin, createRoom);
router.get("/api/rooms/:id", authenticate, getRoom);
router.get("/api/rooms", authenticate, getAllRooms);
router.put("/api/rooms/:id", authenticate, isAdmin, updateRoom);
router.delete("/api/rooms/:id", authenticate, isAdmin, deleteRoom);

export default router;

import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController";
import { authenticate } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.post("/api/bookings", authenticate, createBooking);
router.get("/api/bookings", authenticate, isAdmin, getAllBookings);
router.get("/api/my-bookings", authenticate, getUserBookings);
router.put("/api/bookings/:id", authenticate, isAdmin, updateBooking);
router.delete("/api/bookings/:id", authenticate, isAdmin, deleteBooking);

export default router;

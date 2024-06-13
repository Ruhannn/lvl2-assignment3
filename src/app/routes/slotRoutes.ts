import { Router } from "express";
import { createSlots, getAvailableSlots } from "../controllers/slotController";
import { authenticate } from "../middleware/auth";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

router.post("/api/slots", authenticate, isAdmin, createSlots);
router.get("/api/slots/availability", authenticate, getAvailableSlots);

export default router;

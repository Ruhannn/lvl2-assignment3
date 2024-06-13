import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./app/routes/authRoutes";
import roomRoutes from "./app/routes/roomRoutes";
import slotRoutes from "./app/routes/slotRoutes";
import bookingRoutes from "./app/routes/bookingRoutes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(roomRoutes);
app.use(slotRoutes);
app.use(bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("i love ayaka");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});
export default app;

import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./app/routes/authRoutes";
import roomRoutes from "./app/routes/roomRoutes";
const app = express();

app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(roomRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("i love ayaka");
});

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});
export default app;

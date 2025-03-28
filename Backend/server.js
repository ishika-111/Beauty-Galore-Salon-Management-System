import express from "express";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import appointmentRouter from "./routes/appointmentRoutes.js";
import cookieParser from "cookie-parser";
import authenticateUser from "./Middleware/authMiddleware.js"; // Import your authentication middleware

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);

app.use("/api/appointment", appointmentRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

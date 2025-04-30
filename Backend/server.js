import express from "express";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import appointmentRouter from "./routes/appointmentRoutes.js";
import cookieParser from "cookie-parser";
import authenticateUser from "./Middleware/authMiddleware.js"; // Import your authentication middleware
import adminRouter from "./routes/adminRoutes.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cartRouter from "./routes/cartRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);

app.use("/api/appointment", appointmentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/order", orderRouter);
app.use("/api/admin/dashboard", dashboardRouter);

app.use("/api/cart", cartRouter);
app.use("/api/customer", profileRouter);
app.use("/api/orders", orderRouter);

app.use("/api/payment", paymentRouter);

const createDefaultAdmin = async () => {
  try {
    const adminExists = await prisma.admin.findUnique({
      where: { email: "admin@example.com" }, // ✅ Use email (unique field)
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await prisma.admin.create({
        data: {
          email: "admin@example.com",
          name: "Admin", // You can still set a name, but it’s not unique
          password: hashedPassword,
        },
      });
      console.log("✅ Default admin created: admin@example.com / admin123");
    } else {
      console.log("ℹ Default admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

// Call the function on server startup
createDefaultAdmin();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

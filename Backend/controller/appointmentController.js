import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

// Available time slots (24-hour format in Nepal Time)
const availableTimeSlots = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

// Convert UTC time to Nepal Time (Asia/Kathmandu)
const convertToNepalDate = (date) => {
  return DateTime.fromJSDate(date, { zone: "Asia/Kathmandu" }).toISODate(); // return as YYYY-MM-DD
};

// Helper function to check if the requested time slot is available
const isAvailableTimeSlot = async (appointmentDate, requestedTime) => {
  const timeString = requestedTime;
  console.log("🕒 Checking availability for:", timeString);

  // Convert date to string in format YYYY-MM-DD
  const dateString = convertToNepalDate(appointmentDate);

  // Check if the requested time slot already exists in the database for the same date
  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      date: dateString, // Compare the date as a string
      time: timeString,
    },
  });

  return !existingAppointment;
};

// Helper function to send confirmation email
const sendConfirmationEmail = async (name, email, appointmentDetails) => {
  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider service (e.g., Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com", // Sender address
      to: email, // Receiver address (customer's email)
      subject: "Appointment Booked Successfully", // Email subject
      html: `
        <h1>Appointment Booked.</h1>
        <p>Dear ${name},</p>
        <p>Your appointment has been successfully booked with the following details:</p>
        <ul>
          <li>Date: ${appointmentDetails.date}</li>
          <li>Time: ${appointmentDetails.time}</li>
          <li>Service: ${appointmentDetails.service}</li>
        </ul>
        <p>Thank you for choosing us!</p>
        <p>Best regards, <br>Beauty Galore Salon</p>
      `, // HTML content of the email
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

// ✅ Create Appointment (requires authentication)
const createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, service, timeSlot } = req.body;
    const userId = req.user?.id;

    // Validate that the timeSlot is within the available time slots
    if (!availableTimeSlots.includes(timeSlot)) {
      return res
        .status(400)
        .json({ error: "Invalid time slot. Please choose a valid time." });
    }

    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !service ||
      !timeSlot ||
      !userId
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const appointmentDate = DateTime.fromISO(date, {
      zone: "Asia/Kathmandu",
    }).startOf("day");
    const todayNepal = DateTime.now().setZone("Asia/Kathmandu").startOf("day");

    // Check for past date
    if (appointmentDate < todayNepal) {
      return res.status(400).json({
        error: "You cannot book an appointment for a past date.",
      });
    }

    const requestedTime = timeSlot;

    // Check if the requested time slot is available
    const isAvailable = await isAvailableTimeSlot(
      appointmentDate.toJSDate(),
      requestedTime
    );

    if (!isAvailable) {
      return res.status(400).json({
        error: "Appointment time is not available.",
        suggestion: "Please choose a different time.",
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        date: appointmentDate.toISODate(), // Store in YYYY-MM-DD
        time: requestedTime,
        service,
        userId,
        status: "Pending", // Default status
      },
    });

    // Send the confirmation email to the customer
    await sendConfirmationEmail(name, email, {
      date: appointmentDate.toISODate(),
      time: requestedTime,
      service,
    });

    res
      .status(201)
      .json({ message: "Appointment booked successfully!", appointment });
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    res
      .status(500)
      .json({ error: "Failed to book appointment", details: error.message });
  }
};

// ✅ Cancel Appointment (requires authentication)
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only cancel your own appointments" });
    }
    if (appointment.status !== "Pending") {
      return res
        .status(400)
        .json({ error: "Only pending appointments can be cancelled" });
    }

    const createdAt = DateTime.fromJSDate(appointment.createdAt);
    const now = DateTime.local();
    const hoursSinceBooking = now.diff(createdAt).as("hours");

    if (hoursSinceBooking > 2) {
      return res.status(400).json({
        error: "You can only cancel appointments within 2 hours of booking",
      });
    }

    // Update status to "Cancelled" instead of deleting the appointment
    await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: "Cancelled" }, // Change status instead of deletion
    });

    return res
      .status(200)
      .json({ message: "Appointment canceled successfully" });
  } catch (error) {
    console.error("Cancel error:", error);
    return res.status(500).json({ error: "Failed to cancel appointment" });
  }
};

// ✅ Get User's Appointments
const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("UserID", userId);
    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId },
    });

    if (appointments.length === 0) {
      return res.status(404).json({ error: "No appointments found" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// ✅ Get All Appointments (Admin)
const getAllUserAppointments = async (req, res) => {
  try {
    if (!req.adminId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await prisma.appointment.findMany();

    if (appointments.length === 0) {
      return res.status(404).json({ error: "No appointments found" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// ✅ Confirm Appointment (Admin)
const confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.adminId; // Admin's ID from the request

    if (!adminId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Check if the status is "Pending"
    if (appointment.status !== "Pending") {
      return res
        .status(400)
        .json({ error: "Only pending appointments can be confirmed" });
    }

    // Update the status to "Confirmed"
    const updatedAppointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: "Confirmed" },
    });

    return res.status(200).json({
      message: "Appointment confirmed successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Confirm error:", error);
    return res.status(500).json({ error: "Failed to confirm appointment" });
  }
};

export {
  createAppointment,
  cancelAppointment,
  getUserAppointments,
  getAllUserAppointments,
  confirmAppointment,
};

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
      },
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
// ✅ Cancel Appointment (within 2 hours of booking)
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Find the appointment by id
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Ensure that the user is canceling their own appointment
    if (appointment.userId !== userId) {
      return res
        .status(403)
        .json({ error: "You can only cancel your own appointments" });
    }

    // Ensure that cancellation is done within 2 hours of booking
    const appointmentCreatedAt = DateTime.fromJSDate(appointment.createdAt); // Use createdAt for booking time
    const now = DateTime.local();

    if (now.diff(appointmentCreatedAt, "hours").hours > 2) {
      return res.status(400).json({
        error: "You can only cancel appointments within 2 hours of booking",
      });
    }

    // Delete the appointment
    await prisma.appointment.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user?.id;
    console.log("yserID", userId);
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

export {
  createAppointment,
  cancelAppointment,
  getUserAppointments,
  getAllUserAppointments,
};

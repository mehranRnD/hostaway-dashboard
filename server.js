const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const fetch = require("node-fetch");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Import models
const CheckIn = require("./models/CheckIn");
const CheckOut = require("./models/CheckOut");
const SameDayCheckOut = require("./models/SameDayCheckOuts");

// Enable CORS for all routes and parse JSON
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully ✔️"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

// API Routes
app.post("/api/check-ins", async (req, res) => {
  try {
    const { reservationId } = req.body;

    // Validate required field
    if (!reservationId) {
      return res.status(400).json({
        success: false,
        message: "reservationId is required",
      });
    }

    // Check if check-in already exists for this reservation
    const existingCheckIn = await CheckIn.findOne({ reservationId });
    if (existingCheckIn) {
      return res.status(409).json({
        success: false,
        message: "Check-in already recorded for this reservation",
      });
    }

    // Create new check-in record with required fields
    const checkIn = new CheckIn({
      reservationId,
      checkInTime: req.body.checkInTime || new Date(),
      guestName: req.body.guestName || "Guest",
      arrivalDate:
        req.body.arrivalDate || new Date().toISOString().split("T")[0],
      departureDate:
        req.body.departureDate ||
        new Date(Date.now() + 86400000).toISOString().split("T")[0], // Default to tomorrow
      nights: req.body.nights || 1,
      listingName: req.body.listingName || "Unknown Listing",
      listingMapId: req.body.listingMapId || "unknown",
    });

    await checkIn.save();

    // Format dates in response
    const formattedCheckIn = {
      ...checkIn._doc,
      checkInTime: formatDate(checkIn.checkInTime),
    };

    res.status(201).json({
      success: true,
      message: "Check-in recorded successfully",
      data: formattedCheckIn,
    });
  } catch (error) {
    console.error("Error saving check-in:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record check-in",
      error: error.message,
    });
  }
});

// Get all checked-in reservations
app.get("/api/check-ins", async (req, res) => {
  try {
    const checkIns = await CheckIn.find({}).sort({ checkInTime: -1 }).lean();

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Format dates in response
    const formattedCheckIns = checkIns.map((checkIn) => {
      // Check if arrivalDate is NOT today's date
      if (checkIn.arrivalDate !== today) {
        console.log("Check-in with non-today arrivalDate:", {
          reservationId: checkIn.reservationId,
          guestName: checkIn.guestName,
          arrivalDate: checkIn.arrivalDate,
          departureDate: checkIn.departureDate,
          listingName: checkIn.listingName,
        });
      }

      return {
        ...checkIn,
        checkInTime: checkIn.checkInTime
          ? checkIn.checkInTime.toISOString()
          : null,
        arrivalDate: checkIn.arrivalDate,
        departureDate: checkIn.departureDate,
      };
    });

    // Delete documents with arrivalDate NOT equal to today's date
    await CheckIn.deleteMany({ arrivalDate: { $ne: today } });

    res.status(200).json({
      success: true,
      data: formattedCheckIns,
    });
  } catch (error) {
    console.error("Error in /api/check-ins:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      success: false,
      message: "Failed to fetch check-ins",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
});

// Check-out route
app.post("/api/check-outs", async (req, res) => {
  try {
    const { reservationId } = req.body;

    // Validate required field
    if (!reservationId) {
      return res.status(400).json({
        success: false,
        message: "reservationId is required",
      });
    }

    // Check if check-out already exists for this reservation
    const existingCheckOut = await CheckOut.findOne({ reservationId });
    if (existingCheckOut) {
      return res.status(409).json({
        success: false,
        message: "Check-out already recorded for this reservation",
      });
    }

    // Create new check-out record with all required fields
    const checkOut = new CheckOut({
      reservationId,
      checkOutTime: req.body.checkOutTime || new Date(),
      guestName: req.body.guestName || "Unknown Guest",
      arrivalDate:
        req.body.arrivalDate || new Date().toISOString().split("T")[0],
      departureDate:
        req.body.departureDate ||
        new Date(Date.now() + 86400000).toISOString().split("T")[0], // Default to tomorrow
      nights: req.body.nights || 0,
      listingName: req.body.listingName || "Unknown Listing",
      listingMapId: req.body.listingMapId || "unknown",
    });

    await checkOut.save();

    // Format dates in response
    const formattedCheckOut = {
      ...checkOut._doc,
      checkOutTime: formatDate(checkOut.checkOutTime),
    };

    res.status(201).json({
      success: true,
      message: "Check-out recorded successfully",
      data: formattedCheckOut,
    });
  } catch (error) {
    console.error("Error saving check-out:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record check-out",
      error: error.message,
    });
  }
});

// Get all checked-out reservations
app.get("/api/check-outs", async (req, res) => {
  try {
    const checkOuts = await CheckOut.find({}).sort({ checkOutTime: -1 });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Format dates in response
    const formattedCheckOuts = checkOuts.map((checkOut) => {
      // Check if departureDate is NOT today's date
      if (checkOut.departureDate !== today) {
        console.log("Check-out with non-today departureDate:", {
          reservationId: checkOut.reservationId,
          guestName: checkOut.guestName,
          departureDate: checkOut.departureDate,
          arrivalDate: checkOut.arrivalDate,
          listingName: checkOut.listingName,
        });
      }

      return {
        ...checkOut._doc,
        checkOutTime: formatDate(checkOut.checkOutTime),
      };
    });

    // Delete documents with departureDate NOT equal to today's date
    await CheckOut.deleteMany({ departureDate: { $ne: today } });

    res.status(200).json({
      success: true,
      data: formattedCheckOuts,
    });
  } catch (error) {
    console.error("Error fetching check-outs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch check-outs",
      error: error.message,
    });
  }
});

// Same-day check-out route
app.post("/api/same-day-check-outs", async (req, res) => {
  try {
    const { reservationId } = req.body;

    // Validate required field
    if (!reservationId) {
      return res.status(400).json({
        success: false,
        message: "reservationId is required",
      });
    }

    // Check if same-day check-out already exists for this reservation
    const existingSameDayCheckOut = await SameDayCheckOut.findOne({
      reservationId,
    });
    if (existingSameDayCheckOut) {
      return res.status(409).json({
        success: false,
        message: "Same-day check-out already recorded for this reservation",
      });
    }

    // Create new same-day check-out record with all required fields
    const sameDayCheckOut = new SameDayCheckOut({
      reservationId,
      checkOutTime: req.body.checkOutTime || new Date(),
      guestName: req.body.guestName || "Unknown Guest",
      arrivalDate:
        req.body.arrivalDate || new Date().toISOString().split("T")[0],
      departureDate:
        req.body.departureDate ||
        new Date(Date.now() + 86400000).toISOString().split("T")[0], // Default to tomorrow
      nights: req.body.nights || 0,
      listingName: req.body.listingName || "Unknown Listing",
      listingMapId: req.body.listingMapId || "unknown",
    });

    await sameDayCheckOut.save();

    // Format dates in response
    const formattedSameDayCheckOut = {
      ...sameDayCheckOut._doc,
      checkOutTime: formatDate(sameDayCheckOut.checkOutTime),
    };

    res.status(201).json({
      success: true,
      message: "Same-day check-out recorded successfully",
      data: formattedSameDayCheckOut,
    });
  } catch (error) {
    console.error("Error saving same-day check-out:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record same-day check-out",
      error: error.message,
    });
  }
});

// Get all same-day checked-out reservations
app.get("/api/same-day-check-outs", async (req, res) => {
  try {
    const sameDayCheckOuts = await SameDayCheckOut.find({}).sort({
      checkOutTime: -1,
    });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Format dates in response
    const formattedSameDayCheckOuts = sameDayCheckOuts.map((checkOut) => {
      // Check if arrivalDate is NOT today's date
      if (checkOut.arrivalDate !== today) {
        console.log("Same-day check-out with non-today arrivalDate:", {
          reservationId: checkOut.reservationId,
          guestName: checkOut.guestName,
          arrivalDate: checkOut.arrivalDate,
          departureDate: checkOut.departureDate,
          listingName: checkOut.listingName,
        });
      }

      return {
        ...checkOut._doc,
        checkOutTime: formatDate(checkOut.checkOutTime),
      };
    });

    // Delete records with arrivalDate NOT equal to today's date
    await SameDayCheckOut.deleteMany({ arrivalDate: { $ne: today } });

    res.status(200).json({
      success: true,
      data: formattedSameDayCheckOuts,
    });
  } catch (error) {
    console.error("Error fetching same-day check-outs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch same-day check-outs",
      error: error.message,
    });
  }
});

// Early check-out route
app.post("/api/early-check-outs", async (req, res) => {
  try {
    const { reservationId } = req.body;

    // Validate required field
    if (!reservationId) {
      return res.status(400).json({
        success: false,
        message: "reservationId is required",
      });
    }

    // Check if early check-out already exists for this reservation
    const existingEarlyCheckOut = await EarlyCheckOut.findOne({
      reservationId,
    });
    if (existingEarlyCheckOut) {
      return res.status(409).json({
        success: false,
        message: "Early check-out already recorded for this reservation",
      });
    }

    // Create new early check-out record with all required fields
    const earlyCheckOut = new EarlyCheckOut({
      reservationId,
      checkOutTime: req.body.checkOutTime || new Date(),
      guestName: req.body.guestName || "Unknown Guest",
      arrivalDate:
        req.body.arrivalDate || new Date().toISOString().split("T")[0],
      departureDate:
        req.body.departureDate ||
        new Date(Date.now() + 86400000).toISOString().split("T")[0], // Default to tomorrow
      nights: req.body.nights || 0,
      listingName: req.body.listingName || "Unknown Listing",
      listingMapId: req.body.listingMapId || "unknown",
    });

    await earlyCheckOut.save();

    // Format dates in response
    const formattedEarlyCheckOut = {
      ...earlyCheckOut._doc,
      checkOutTime: formatDate(earlyCheckOut.checkOutTime),
    };

    res.status(201).json({
      success: true,
      message: "Early check-out recorded successfully",
      data: formattedEarlyCheckOut,
    });
  } catch (error) {
    console.error("Error saving early check-out:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record early check-out",
      error: error.message,
    });
  }
});

app.get("/api/early-check-outs", async (req, res) => {
  try {
    const earlyCheckOuts = await EarlyCheckOut.find({}).sort({
      checkOutTime: -1,
    });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Format dates in response
    const formattedEarlyCheckOuts = earlyCheckOuts.map((checkOut) => {
      // Check if arrivalDate is NOT today's date
      if (checkOut.arrivalDate !== today) {
        console.log("Early check-out with non-today arrivalDate:", {
          reservationId: checkOut.reservationId,
          guestName: checkOut.guestName,
          arrivalDate: checkOut.arrivalDate,
          departureDate: checkOut.departureDate,
          listingName: checkOut.listingName,
        });
      }

      return {
        ...checkOut._doc,
        checkOutTime: formatDate(checkOut.checkOutTime),
      };
    });

    // Delete records with arrivalDate NOT equal to today's date
    await EarlyCheckOut.deleteMany({ arrivalDate: { $ne: today } });

    res.status(200).json({
      success: true,
      data: formattedEarlyCheckOuts,
    });
  } catch (error) {
    console.error("Error fetching early check-outs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch early check-outs",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  const baseUrl =
    NODE_ENV === "production"
      ? process.env.PRODUCTION
      : `http://localhost:${PORT}`;

  console.log(`Server is running in ${NODE_ENV} mode ✔️`);
  console.log(`Server URL: ${baseUrl} ✔️`);
});

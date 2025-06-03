const mongoose = require("mongoose");

const sameDayCheckOutSchema = new mongoose.Schema(
  {
    reservationId: {
      type: String,
      required: [true, "Reservation ID is required"],
      unique: true,
      trim: true,
    },
    checkOutTime: {
      type: Date,
      required: [true, "Check-out time is required"],
      default: Date.now,
    },
    guestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
      default: "Unknown Guest",
    },
    arrivalDate: {
      type: String,
      required: [true, "Arrival date is required"],
      trim: true,
    },
    departureDate: {
      type: String,
      required: [true, "Departure date is required"],
      trim: true,
    },
    nights: {
      type: Number,
      required: [true, "Number of nights is required"],
      min: [0, "Nights cannot be negative"],
      default: 0,
    },
    listingName: {
      type: String,
      required: [true, "Listing name is required"],
      trim: true,
      default: "Unknown Listing",
    },
    listingMapId: {
      type: String,
      required: [true, "Listing map ID is required"],
      trim: true,
      default: "unknown",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for faster querying
sameDayCheckOutSchema.index({ checkOutTime: -1 });

module.exports = mongoose.model("SameDayCheckOut", sameDayCheckOutSchema);

const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    reservationId: {
      type: String,
      required: true,
      unique: true,
    },

    checkInTime: {
      type: Date,
      required: true,
      default: Date.now,
    },

    guestName: {
      type: String,
      required: true,
      default: "Unknown Guest",
    },

    arrivalDate: {
      type: String,
      required: true,
    },

    departureDate: {
      type: String,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
      default: 0,
    },

    listingName: {
      type: String,
      required: true,
    },

    listingMapId: {
      type: String,
      required: true,
    },

    // Add timestamps for when the document was created and last updated
  },
  { timestamps: true }
);

// Create a compound index to ensure one check-in per reservation
checkInSchema.index({ reservationId: 1 }, { unique: true });

module.exports = mongoose.model("CheckIn", checkInSchema);

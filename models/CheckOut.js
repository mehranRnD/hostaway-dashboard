const mongoose = require("mongoose");

const checkOutSchema = new mongoose.Schema({
  reservationId: {
    type: String,
    required: true,
    unique: true,
  },
  checkOutTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  
  // We'll keep the same structure as CheckIn for consistency
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

// Create a compound index to ensure one check-out per reservation
checkOutSchema.index({ reservationId: 1 }, { unique: true });

module.exports = mongoose.model("CheckOut", checkOutSchema);

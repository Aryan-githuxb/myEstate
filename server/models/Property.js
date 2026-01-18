const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photos: { type: [String], required: true }, // Array of image URLs
  rooms: { type: Number, required: true }, // e.g., "3bhk"
  price: { type: Number, required: true },
  type: { type: String, required: true }, // Villa, Flat, etc.
  areaSize: { type: Number, required: true }, // sq ft
  status: { type: String, required: true }, // Ready/Under Construction
  address: {
    area: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
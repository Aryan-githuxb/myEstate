const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photos: { type: [String], required: true },
  rooms: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  areaSize: { type: Number, required: true },
  status: { type: String, required: true },
  address: {
    area: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);
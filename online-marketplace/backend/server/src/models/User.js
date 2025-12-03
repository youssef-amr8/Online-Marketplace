const mongoose = require('mongoose');

const sellerProfileSchema = new mongoose.Schema({
  storeName: String,
  taxId: String,
  serviceAreas: [String] // optional: city/zip codes
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true },
  // keep role optional if using separated apps; still helpful
  role: { type: String, enum: ['buyer','seller'], required: false },
  sellerProfile: sellerProfileSchema,
  flags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flag' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

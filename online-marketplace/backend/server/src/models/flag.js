const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  reason: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Flag', flagSchema);

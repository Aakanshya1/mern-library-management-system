const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false } ,
  createdAt: { type: Date, default: Date.now }, 
  lastNotified: {  // Add this field if not already there
        type: Date,
        default: null
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

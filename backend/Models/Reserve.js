const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book' 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    totalPoints: {
        type: Number 
        },
    reservedAt: {
         type: Date, 
         default: Date.now
        },
        status: { type: String,
             enum: ['reserved','notified' ,'cancelled'],
              default: 'reserved' },

  });
  
  const Reservation = mongoose.model('Reservation', ReservationSchema);
  module.exports = Reservation;
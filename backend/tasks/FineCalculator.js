// calculateFines.js
const BookBorrow = require('../Models/Borrow'); // Adjust path as needed
const User = require('../Models/Userdata'); // Adjust path as needed

// Function to calculate fines for overdue books
const FineCalculator = async () => {
  console.log("Cron job started for calculating fines.");
  try {
    const overdueBooks = await BookBorrow.find({
      toDate: { $lt: new Date() },
      returned: false
    }).populate('userId');

    const finePerDay = 5; // Example fine rate per day

    for (const book of overdueBooks) {
      const overdueDays = Math.ceil((new Date() - book.toDate) / (1000 * 60 * 60 * 24));
      const fine = overdueDays * finePerDay;
      book.fine = fine;
      await book.save();

      const user = book.userId;
      user.totalFine += fine;
      await user.save();

      console.log(`Calculated fine for user ${user._id}: $${fine}`);
    }
  } catch (error) {
    console.error('Error calculating fines:', error);
  }
};

module.exports = FineCalculator;

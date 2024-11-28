const cron = require('node-cron');
const BookBorrow = require('../Models/Borrow'); // Adjust path as needed
const User = require('../Models/Userdata'); // Adjust path as needed

const calculateFines = async () => {
  console.log("Cron job started for calculating fines.");
  try {
    const overdueBooks = await BookBorrow.find({
      toDate: { $lt: new Date() },
      returned: false,
    }).populate("userId");

    const finePerDay = 5; // Fine rate

    for (const book of overdueBooks) {
      // Ensure fineStartDate is set
      if (!book.fineStartDate) {
        book.fineStartDate = new Date(book.toDate);
      }

      // Calculate overdue days
      const overdueDays = Math.floor(
        (new Date() - book.fineStartDate) / (1000 * 60 * 60 * 24)
      );
      const fine = overdueDays * finePerDay;

     

      // Update book and user records
      book.fine = fine;
      await book.save();

      const user = book.userId;
      user.totalFine = fine; // Avoid incrementing; set directly
      await user.save();

      console.log(`User ${user._id}, Total Fine Updated: ${user.totalFine}`);
    }
  } catch (error) {
    console.error("Error calculating fines:", error);
  }
};


module.exports = calculateFines;




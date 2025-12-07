const cron = require('node-cron');
const BookBorrow = require('../Models/Borrow'); // Adjust path as needed
const UserModel = require('../Models/Userdata');
const Notification = require('../Models/Notifications');
const {sendOverdueEmail,sendAvailableBookEmail } = require('../utils/EmailService');
const Reservation = require('../Models/Reserve');

const checkOverdueBooksAndNotify = async () => {
    try {
        console.log("Checking overdue books...");
      const today = new Date();
  
      const overdueBooks = await BookBorrow.find({
        toDate: { $lt: new Date() },
        returned: false
      }).populate('bookId', 'title'); 
      console.log(overdueBooks);
      for (const book of overdueBooks) {
        const user = await UserModel.findById(book.userId);
        if (user) {
           
       
            const notificationMessage = `The book "${book.bookId.title}" is overdue. Please return it as soon as possible.`;
            const date = new Date();

            const notification = new Notification({
              userId: user._id,         // Set userId for the notification
              message: notificationMessage,
              createdAt: date,     // Explicitly set the createdAt date
            });
    
            // Save the notification to the database
            await notification.save();
    
            // Optionally, push the notification to the user's notifications array if needed
            user.notifications = user.notifications || [];
            user.notifications.push(notification);  // Add the notification to the user's list
            await user.save(); // Save the user document
          const bookDetails = [
            {
              title: book.bookId.title,
              toDate: book.bookId.toDate,
            },
          ];
      
          await sendOverdueEmail(user.email, user.firstname, bookDetails);
      
        }
      }
    } catch (error) {
      console.error('Error checking overdue books:', error);
    }
  };




  module.exports ={ checkOverdueBooksAndNotify  };

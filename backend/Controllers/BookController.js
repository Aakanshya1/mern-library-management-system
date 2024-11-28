const cloudinary = require('../utils/cloudinary');
const BookModel = require('../Models/Books');
const {getAllBooks} = require('../Services/Bookservice')
const { quickSortBooks } = require('../utils/Sortbooks');
const { binarySearchBooks } = require('../utils/Searchbook');
const BookBorrow = require ('../Models/Borrow');
const UserModel = require('../Models/Userdata');
const ContributionModel = require('../Models/Contribution');
const Reservation = require('../Models/Reserve');
const {sendOverdueEmail} = require('../utils/EmailService')
const cron = require('node-cron');
const Notification = require('../Models/Notifications');
const {sendAvailableBookEmail}= require('../utils/EmailService')



const addbook= async(req,res)=>{
    try{
        const{isbn,title,category,description,author,bookCount,bookimage,bookStatus}=req.body;
        const book = await BookModel.findOne({isbn});
        if(book){
            return res.status(409)
            .json({message:"book already exist", success:false})
        }
       
        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'books',
                public_id: `${isbn}_bookimage`,
                width: 300,
                crop: "scale"
            });

            // Set Cloudinary URL as the user's avatar
            uploadedImageUrl = result.secure_url;
        }
        const bookModel = new BookModel({isbn,title,category,description,author,bookCount,bookStatus,bookimage:uploadedImageUrl})

        await bookModel.save();
        res.status(201)
        .json({
            message:"book added successfully",
            success:true
        })
    }catch(error){
        res.status(500)
        .json({
            message:"Internal Server error",
            success:false
        })
    }

    
};
const showAllbooks  = async(req,res)=>{
    try {
        const books = await BookModel.find();
        const sortedBooks = quickSortBooks(books, 'title'); 
        if(sortedBooks.length==0){
            return res.status(404).json({message:"No Books Found "})
        }
        res.status(200).json({
            success:true,
            message:"books retrived Successfully",
            books:sortedBooks,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
}
const updateBook = async(req,res)=>{
    try {
        const { _id } = req.params;
        const book = await BookModel.findById(_id);
    
        if(!book){
            return res.status(400).json({message:"Book id not found"});
        }

        book.isbn = req.body.isbn|| book.isbn;
        book.title= req.body.title|| book.title;
        book.description = req.body.description|| book.description;
        book.author= req.body.author||book.author;
        book.category = req.body.category|| book.category;
        book.bookCount= req.body.bookCount|| book.bookCount;
        book.bookStatus= req.body.bookStatus|| book.bookStatus;
        
        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'books',
                public_id: `${BookModel._id}_bookimage`,
                width: 300,
                crop: "scale"
            });
            book.bookimage = result.secure_url;
        }
const updatedbook = await book.save();
res.json({
    _id:updatedbook._id,
    isbn:updatedbook.isbn,
    title:updatedbook.title,
    category:updatedbook.category,
    description:updatedbook.description,
    author:updatedbook.author,
    bookCount:updatedbook.bookCount,
    bookStatus:updatedbook.bookStatus,
    bookimage:updatedbook.bookimage,

})

    } catch (error) {
        console.error('Error updating book data:',error.message);
        res.status(500).json({message:"Internal Server Error"});
    }

}
const deleteBook = async (req, res) => {
    try {
        const { _id } = req.params;
        const book = await BookModel.findByIdAndDelete(_id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            deletedBook: book,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
const SearchBooksByTitle = async (req, res) => {
    const { prefix } = req.query;
    
console.log(prefix);
    

    try {
        if (!prefix) {
            return res.status(400)
            .json({ success: false, message: "Title is required for search" });
        }

        const books = await getAllBooks(); 
        const sortedBooks = quickSortBooks(books); 

        const foundBooks = sortedBooks.filter(book =>
            book.title.toLowerCase().startsWith(prefix.toLowerCase())
        );

      
        if (foundBooks) {
            res.status(200).json({
                success: true,
                books: foundBooks
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const SearchBooksByIsbn = async (req, res) => {
    const { isbnPrefix } = req.query;

    try {
        if (!isbnPrefix) {
            return res.status(400).json({ success: false, message: "ISBN is required for search" });
        }

        const books = await getAllBooks(); // Fetch all books
        const sortedBooks = quickSortBooks(books, 'title'); // Sort books by title

        // Filter books based on whether their ISBN starts with the provided prefix
        const foundBooks = sortedBooks.filter(book =>
            book.isbn.startsWith(isbnPrefix)
        );

        if (foundBooks.length > 0) {
            res.status(200).json({
                success: true,
                books: foundBooks
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No books found with the given ISBN prefix'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const borrowBook = async (req, res)=>{
    const {bookId, fromDate, toDate}= req.body;
    try {
       const userId = req.user._id;
        const user = await UserModel.findById(userId);
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const book = await BookModel.findById(bookId);
        if(!book || book.bookCount <=0){
            return res.status(400)
            .json({message:"Book is not available for borrowing", available:false})
        }

        const borrowRecord = new BookBorrow({
            bookId,userId,fromDate,toDate
        })
         await borrowRecord.save();
         book.bookCount -= 1;
         if (book.bookCount === 0) {
            book.bookStatus = 'Borrowed'; 
        }
      
         await book.save();
         const pointsEarned = 2;
         user.borrowedpoints += pointsEarned;
         user.totalPoints += pointsEarned;
         await user.save();

         res.status(201).json({message :"Book borrowed Successfully", borrowRecord, available:true})
    } catch (error) {
        console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Failed to borrow book' });
    }
}
const displayBorrowedBooks = async (req,res)=>{
    try {
        const borrowedbook = await BookBorrow.find({returned:false})
        .populate('bookId', 'isbn title')
        .populate('userId','firstname lastname email')
        .exec();

        const borrowedbooks = borrowedbook.map(BookBorrow =>({
            isbn: BookBorrow.bookId.isbn,
            title: BookBorrow.bookId.title,
            userId: BookBorrow.userId._id,
            firstname: BookBorrow.userId.firstname,
            lastname: BookBorrow.userId.lastname,
            email: BookBorrow.userId.email,
            toDate:BookBorrow.toDate,
            fromDate:BookBorrow.fromDate,
            returned:BookBorrow.returned,
            fine:BookBorrow.fine,
        }))
        if(borrowedbooks.length == 0){
            return res.status(404)
            .json({message:'Books not found'})
        }
        res.status(200).json({
            success:true,
            message:"Borrowed books retrived successfully",
            borrowedbooks:borrowedbooks,
        })
       
    } catch (error) {
        console.error('Error fetching borrowed books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const userBorrowedBooks = async(req,res)=>{
   
    try {
        const userId = req.user._id;
    
        const borrowedbooks = await BookBorrow.find({ userId, returned: false })
        .populate('bookId','isbn title bookimage')
        .exec();
        const borrowedbooklist = borrowedbooks.map(BookBorrow =>({
            _id: BookBorrow._id, 
            isbn: BookBorrow.bookId.isbn,
            title: BookBorrow.bookId.title,
            toDate:BookBorrow.toDate,
            fromDate:BookBorrow.fromDate,
            returned:BookBorrow.returned,
            fine:BookBorrow.fine,
            bookimage:BookBorrow.bookId.bookimage,
        }))
        if(borrowedbooklist.length == 0){
            return res.status(404)
            .json({message:'Books not found'})
        }
            res.status(200).json({
                success:true,
                message:"Borrowed books retrived successfully",
                borrowedbooklist:borrowedbooklist,
            })
    }  catch (error) {
        console.error('Error fetching borrowed books:', error);
        res.status(500).json({ message: 'Internal server error' });
      
    }
}
const returnBooks = async (req, res) => {
    try {
      

        const userId = req.user._id;
        const { borrowId } = req.body;

      

        const borrowedRecord = await BookBorrow.findById(borrowId).populate('bookId').populate('userId');

        console.log('Borrowed Record:', borrowedRecord);
        if (!borrowedRecord) {
            return res.status(404).json({ message: 'Borrowed book not found or already returned' });
        }

        if (borrowedRecord.fine > 0) {
            return res.status(400).json({
                message: `A fine of $${borrowedRecord.fine} is due. Please complete the payment before returning the book.`,
                fine: borrowedRecord.fine,
            });
        }

        // Mark as returned
        borrowedRecord.returned = true;
        await borrowedRecord.save();

        // Update book count and status
        const book = await BookModel.findById(borrowedRecord.bookId);
        if (book) {
            book.bookCount += 1;
            book.bookStatus = book.bookCount > 0 ? 'Available' : 'Borrowed';
            await book.save();
        }

        return res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        console.error('Error while returning book:', error);
        res.status(500).json({ message: 'Failed to return book', error: error.message });
    }
};

const displayReturnedBooks = async (req,res)=>{
    try {
        const returnedbook = await BookBorrow.find({returned:true})
        .populate('bookId', 'isbn title')
        .populate('userId','firstname lastname email')
        .exec();

        const returnedbooks = returnedbook .map(BookBorrow =>({
            isbn: BookBorrow.bookId.isbn,
            title: BookBorrow.bookId.title,
            userId: BookBorrow.userId._id,
            firstname: BookBorrow.userId.firstname,
            lastname: BookBorrow.userId.lastname,
            email: BookBorrow.userId.email,
            toDate:BookBorrow.toDate,
            fromDate:BookBorrow.fromDate,
            returned:BookBorrow.returned,
            fine:BookBorrow.fine,
        }))
        if(returnedbooks.length == 0){
            return res.status(404)
            .json({message:'Books not found'})
        }
        res.status(200).json({
            success:true,
            message:"Returned books retrived successfully",
            returnedbooks:returnedbooks,
        })
       
    } catch (error) {
        console.error('Error fetching Returned books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const userReturnedBooks = async(req,res)=>{
   
    try {
        const userId = req.user._id;
    console.log(userId);
        const returnedbooks = await BookBorrow.find({ userId, returned: true })
        .populate('bookId','isbn title bookimage')
        .exec();
        const returnedbooklist = returnedbooks.map(BookBorrow =>({
            isbn: BookBorrow.bookId.isbn,
            title: BookBorrow.bookId.title,
            toDate:BookBorrow.toDate,
            fromDate:BookBorrow.fromDate,
            returned:BookBorrow.returned,
            fine:BookBorrow.fine,
            bookimage:BookBorrow.bookId.bookimage,
        }))
        if(returnedbooklist.length == 0){
            return res.status(404)
            .json({message:'Books not found'})
        }
            res.status(200).json({
                success:true,
                message:"Returned books retrived successfully",
                returnedbooklist:returnedbooklist,
            })
    }  catch (error) {
        console.error('Error fetching Returned books:', error);
        res.status(500).json({ message: 'Internal server error' });
      
    }
}
const displayStatus = async (req,res)=>{
    try {
        const totalbooks = await BookModel.countDocuments();
        const borrowedlist = await BookBorrow.countDocuments({returned:false});
        const returnedlist = await BookBorrow.countDocuments({returned:true});



        const totalusers = await UserModel.countDocuments();
        const admin = await UserModel.countDocuments({role:"admin"});
        const librarian = await UserModel.countDocuments({role:"librarian"});
        const user = await UserModel.countDocuments({role:"user"});

        res.json({
            bookStats: {
                totalbooks ,
                borrowedlist,
                returnedlist,
            },
            userStats: {
                totalusers,
                admin,
                librarian ,
                user,
            },
          });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}
const overduebooks= async (req,res)=>{
    try {
        const overdueBooks = await BookBorrow.find({
          toDate: { $lt: new Date() },
          returned: false
        }).populate('userId', 'name totalFine'); // Adjust fields as needed
    
        res.status(200).json({
          message: 'Overdue books retrieved successfully',
          overdueBooks: overdueBooks
        });
      } catch (error) {
        console.error('Error retrieving overdue books:', error);
        res.status(500).json({ message: 'Failed to retrieve overdue books', error });
      }
}

const contribution = async (req,res)=>{
    const {bookname,authorname,reason,category}= req.body;
    // Validate input
    if (!bookname || !authorname || !reason || !category) {
        return res.status(400).json({ message: 'All fields are required' });
      }
 try {
  const userId = req.user._id;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
}
console.log('Request Body:', req.body);
console.log('Headers:', req.headers);
const contributionRecord = new ContributionModel({
    bookname,authorname,reason,category,userId
})
await contributionRecord.save();
const pointsearned = 1;
user.contributionpoints +=pointsearned;
user.totalPoints +=pointsearned;
await user.save();

res.status(201)
.json({message:'Book contribution successfull',contributionRecord,})
 } catch (error) {
    console.error('Error contributing book', error);
    res.status(500)
    .json({message:'Failed to contribute book'});
 }
}
const displayContribution= async(req,res)=>{
    try {
        const contributionbook = await ContributionModel.find()
        .populate('userId', 'firstname lastname email')
        .exec();

        const contributionbooks =   contributionbook.map(ContributionModel=>({
            firstname:ContributionModel.userId.firstname,
            lastname: ContributionModel.userId.lastname,
            email: ContributionModel.userId.email,
            bookname:ContributionModel.bookname,
            authorname:ContributionModel.authorname,
            reason:ContributionModel.reason,
            category:ContributionModel.category,
        }))
        if(contributionbooks.length == 0){
            return res.status(404)
            .json({message:"Contribution books not found"})
        }
        res.status(200).json({
            success:true,
            message:"Contribution books retrive successfully",
            contributionbooks:contributionbooks,
        })
    } catch (error) {
        console.error('Error fetching contribution books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const reserveBook = async (req, res) => {
    const { bookId } = req.body;
    console.log(bookId);
    try {
      
        const userId = req.user._id;  


        const book = await BookModel.findById(bookId);
        if(!book){
            return res.status(400).json({ message: 'Book not found' });
        }
        if (book.bookCount > 0) {
            return res.status(400).json({ message: 'Book is available' });
        }


        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Create a reservation
        const reservation = new Reservation({
            userId,
            bookId,
            status: 'reserved',
            reservedAt: Date.now(),
        });

        await reservation.save();
        return res.status(200).json({
            message: 'Book reserved successfully',
            reservation
        });
    } catch (error) {
        console.error('Error reserving book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const processQueue = async (bookId) => {
    try {
        console.log("Checking reserved books for availability...");

        // Step 1: Find all books that are reserved
        const reservedBooks = await Reservation.find({ status: 'reserved' })
            .populate('bookId', 'title author bookCount') // Include book details
            .populate('userId', 'firstname email totalPoints notifications lastNotified'); // Include user details
        
        if (!reservedBooks.length) {
            console.log("No reserved books found.");
            return;
        }

        console.log("Reserved books data:", reservedBooks);

        // Step 2: Loop through each reserved book and check availability
        for (const reservation of reservedBooks) {
            const book = reservation.bookId; // Get the book details from reservation
            const user = reservation.userId; // Get the user details from reservation
            
            if (book && book.bookCount > 0 && user) {
                console.log(`Processing reservation for book: "${book.title}"`);

                // Ensure bookId and userId are correctly populated and accessible
                console.log(`Book ID: ${book._id}`);
                console.log(`User ID: ${user._id}`);

                // Filter and sort the reservations for this book
                const sortedReservations = reservedBooks
                    .filter(r => r.bookId && r.bookId._id.equals(book._id))  // Use `.equals` for MongoDB ObjectId comparison
                    .sort((a, b) => b.userId.totalPoints - a.userId.totalPoints); // Sort by totalPoints

                console.log(`Sorted reservations for book "${book.title}":`, sortedReservations);

                if (sortedReservations.length === 0) {
                    console.log(`No reservations found for book: "${book.title}"`);
                    continue;  // Skip to the next book if no reservations for this book
                }

                // Get the highest point user reservation
                const highestPointUserReservation = sortedReservations[0];
                console.log(`Highest point user: ${highestPointUserReservation.userId.firstname} with points: ${highestPointUserReservation.userId.totalPoints}`);

                const lastNotifiedTime = highestPointUserReservation.lastNotified;
                const currentTime = new Date();

                if (!lastNotifiedTime || currentTime - new Date(lastNotifiedTime) >= 24 * 60 * 60 * 1000) {
                    // If 24 hours have passed or it has never been notified, send the notification

                    // Create a notification in the database
                    const notificationMessage = `The book "${book.title}" is now available. You can borrow it.`;
                    const date = new Date();

                    const notification = new Notification({
                        userId: highestPointUserReservation.userId._id,
                        message: notificationMessage,
                        createdAt: date,
                    });

                    await notification.save(); // Save notification to DB

                    // Add the notification to the user's notifications array
                    highestPointUserReservation.userId.notifications = highestPointUserReservation.userId.notifications || [];
                    highestPointUserReservation.userId.notifications.push(notification);
                    await highestPointUserReservation.userId.save();

                    console.log(`Notification sent for available book "${book.title}" to user "${highestPointUserReservation.userId.firstname}"`);

                    // Send email notification (optional)
                    const bookDetails = { title: book.title, author: book.author };
                    await sendAvailableBookEmail(highestPointUserReservation.userId.email, highestPointUserReservation.userId.firstname, bookDetails);

                    // Update reservation status to 'notified' and set the lastNotified time
                    highestPointUserReservation.status = 'notified';
                    highestPointUserReservation.lastNotified = date;
                    await highestPointUserReservation.save();
                } else {
                    console.log(`User with the highest points has already been notified within the last 24 hours.`);
                }

                // Step 3: If the book is borrowed, update the reservation status and book inventory
                if (book.bookCount > 0 && highestPointUserReservation.status === 'notified') {
                    highestPointUserReservation.status = 'notified';
                    await highestPointUserReservation.save();

                    // Update book inventory
                    book.bookCount -= 1;
                    await book.save();

                    console.log(`Book "${book.title}" assigned to user "${highestPointUserReservation.userId.firstname}"`);
                } else {
                    console.log(`Book "${book.title}" is not available for reservation or the user has not been notified.`);
                }
            }
        }
    } catch (error) {
        console.error('Error processing reserved books:', error);
    }
};
const displayReservedBooks = async(req,res)=>{
    try{
        const reservedbook = await Reservation.find()
        .populate('bookId','isbn title')
        .populate('userId','firstname lastname email')
        .exec();
        const reservationbooks = reservedbook.map(Reservation=>({
            isbn:Reservation.bookId.isbn,
            title:Reservation.bookId.title,
            userId:Reservation.userId.userId,
            firstname:Reservation.userId.firstname,
            lastname:Reservation.userId.lastname,
            reservedAt:Reservation.reservedAt,
            status:Reservation.status
        }))
        if(reservationbooks.length==0){
            return res.status(404)
            .json({message:'Books not found'})
        }
        res.status(200).json({
            success:true,
            message:"Borrowed books retrived successfully",
            reservationbooks:reservationbooks,
        })
    }catch(error){
        console.error('Error fetching reserved books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const userReservedBooks = async(req,res)=>{
    try {
        const userId = req.user._id;
        const reservedbooks = await Reservation.find({userId})
        .populate('bookId','isbn title bookimage')
        .exec()
        const reservedbooklist = reservedbooks.map(Reservation =>({
            _id: Reservation._id, 
            isbn: Reservation.bookId.isbn,
            title: Reservation.bookId.title,
            reservedAt:Reservation.reservedAt,
            bookimage:Reservation.bookId.bookimage,
            status:Reservation.status
        }))
        if(reservedbooklist .length == 0){
            return res.status(404)
            .json({message:'Books not found'})
        }
            res.status(200).json({
                success:true,
                message:"Borrowed books retrived successfully",
                reservedbooklist :reservedbooklist ,
            })
    } catch (error) {
        console.error('Error fetching reserved books:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}


  const fetchNotifications = async (req, res) => {
    try {
      const userId = req.user._id;  // This is from the authentication middleware
  
      // Fetch notifications for the specific user using the 'userId' field
      const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }); // Sorting by createdAt to get the latest notifications first
  
      if (!notifications) {
        return res.status(404).json({ message: 'No notifications found' });
      }
  
      // Return the notifications in the response
      res.status(200).json(notifications || []);  // Return notifications, or an empty array if none
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
const markNotification = async(req,res)=>{
    try {
        const notificationId = req.body._id;
        const updatedNotification = await Notification.findByIdAndUpdate(
          notificationId, 
          { read: true }, // Set 'read' to true
          { new: true } // Return the updated document
        );
    
        if (!updatedNotification) {
          return res.status(404).json({ message: "Notification not found" });
        }
    
        res.json({ message: "Notification marked as read" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
const getAllUserNotifications = async () => {
    try {
      // Fetch all users from the database and include their notifications
      const users = await UserModel.find({});  // Get all users
      let allNotifications = [];
  
      // Loop through each user and push their notifications
      users.forEach(user => {
        if (user.notifications && user.notifications.length > 0) {
          allNotifications.push(...user.notifications);  // Add user's notifications to the list
        }
      });
  
      return allNotifications;
    } catch (error) {
      throw new Error('Error fetching all notifications: ' + error.message);
    }
  };
  

module.exports = { addbook , 
    showAllbooks,
    updateBook,
    deleteBook,
    SearchBooksByTitle,
    SearchBooksByIsbn,
    borrowBook,
    displayBorrowedBooks,
    userBorrowedBooks,returnBooks,
    displayReturnedBooks,
    userReturnedBooks,
    displayStatus,
    overduebooks,
    contribution,displayContribution,reserveBook,
    processQueue, displayReservedBooks,userReservedBooks,fetchNotifications
    ,markNotification,getAllUserNotifications 
};
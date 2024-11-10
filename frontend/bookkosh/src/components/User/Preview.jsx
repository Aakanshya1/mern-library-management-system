import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import BookReserve from './popups/BookReserve';
import BookBorrow from './popups/BookBorrow';

const Preview = ({ selectedBook, onBack, showBorrowPopup, setShowBorrowPopup, showReservePopup, setShowReservePopup }) => {

  const handleReserve = () => {
    setShowReservePopup(true);
  };

  const handleBorrow = () => {
    setShowBorrowPopup(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <button onClick={onBack} className='flex flex-row gap-3 w-fit text-blue font-bold items-center'>
        <IoMdArrowBack /> Back to List
      </button>
      <div className="flex md:flex-row flex-col justify-around gap-4">
        <div className='h-fit flex-[0.2]'>
          <span className=''>
            <img src={selectedBook.bookimage} className='bg-white p-4 w-[200px]' />
          </span>
        </div>
        <div className="flex flex-col text-sm flex-[0.3] gap-4 p-4 rounded-md">
          <p className="text-2xl">{selectedBook.title}</p>
          <p className="text-sm text-gray-500">By {selectedBook.author}</p>
          <p className='flex items-center gap-2'><strong>Category:</strong> {selectedBook.category}</p>
          <strong>No of copies: <span>{selectedBook.bookCount}</span></strong>
          <div className='flex gap-2 items-center'>
            <strong>Availability:</strong>
            <span className={selectedBook.bookStatus === "Available" ? "bg-green text-white py-2 px-2 text-center rounded-md" : "bg-blue text-white py-2 px-2 text-center rounded-md"}>
              {selectedBook.bookStatus}
            </span>
            <button onClick={selectedBook.bookStatus === "Available" ? handleBorrow : handleReserve} className={selectedBook.bookStatus === "Available" ? "bg-green text-white py-2 px-4 text-center rounded-md" : "border text-blue py-2 px-4 text-center rounded-md"}>
              {selectedBook.bookStatus === "Available" ? "Borrow" : "Reserve"}
            </button>
          </div>
        </div>
        <div className='flex-[0.5] bg-white p-4 rounded-md text-xs'>
          <p><strong>Description:</strong> {selectedBook.description}</p>
        </div>
      </div>
      {showReservePopup && <BookReserve
  showReservePopup={showReservePopup}
  setShowReservePopup={setShowReservePopup}
  currentBook={selectedBook} 
/>}
      {showBorrowPopup && <BookBorrow 
      showBorrowPopup={showBorrowPopup} 
      setShowBorrowPopup={setShowBorrowPopup} 
      currentBook={selectedBook} />}
    </div>
  );
};

export default Preview;

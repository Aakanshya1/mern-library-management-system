import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BookBorrow = ({ showBorrowPopup, setShowBorrowPopup, currentBook, updateBookStatus }) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if (showBorrowPopup) {
            const today = new Date().toISOString().split('T')[0];
            setFromDate(today);
        }
    }, [showBorrowPopup]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Book ID:', currentBook._id);

        if (new Date(toDate) <= new Date(fromDate)) {
            toast.error('To Date must be after From Date.');
            return;
        }

        const borrowData = {
            bookId: currentBook._id,
            fromDate,
            toDate,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/books/borrowedbooks/${currentBook._id}`, borrowData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you're using token-based authentication
                }
            });
        
         
             
                toast.success("Book Borrowed successfully");
          
                setTimeout(() => {
                    setShowBorrowPopup(false);
                }, 4000); 
           
           
           
         
        } catch (error) {
            console.error('Error borrowing book:', error);
            toast.error('Failed to borrow the book');
        }
    };

    const resetForm = () => {
        setFromDate('');
        setToDate('');
    };

    return (
        <>
            {showBorrowPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-md shadow-2xl p-10 w-96 text-xs">
                        <h2 className="font-bold text-center text-xl mb-4">Borrow Book</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                            <div>
                                <label className="text-blue font-semibold">ISBN</label>
                                <input
                                    type="text"
                                    name="isbn"
                                    value={currentBook.isbn}
                                    readOnly
                                    className="border rounded-md w-full p-2 bg-gray-200"
                                    aria-label="ISBN"
                                />
                            </div>

                            <div>
                                <label className="text-blue font-semibold">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={currentBook.title}
                                    readOnly
                                    className="border rounded-md w-full p-2 bg-gray-200"
                                    aria-label="Title"
                                />
                            </div>

                            <div>
                                <label className="text-blue font-semibold">From Date</label>
                                <input
                                    type="date"
                                    name='fromDate'
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>

                            <div>
                                <label className="text-blue font-semibold">To Date</label>
                                <input
                                    type='date'
                                    name='toDate'
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    required
                                    className="border rounded-md w-full p-2"
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                <button type="submit" className="bg-blue p-2 rounded-md text-white">
                                    Borrow
                                </button>
                                <button
                                    type="button"
                                    className="bg-white text-blue border py-2 px-3 rounded-md"
                                    onClick={() => setShowBorrowPopup(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default BookBorrow;

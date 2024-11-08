const quickSortBooks = (books) => {
    if (books.length <= 1) return books; 
    const pivot = books[books.length - 1]; 
    const left = [];
    const right = [];

    for (let i = 0; i < books.length - 1; i++) {
     
        if (books[i].title.toLowerCase() < pivot.title.toLowerCase()) {
            left.push(books[i]); 
        } else {
            right.push(books[i]); 
        }
    }
    

    return [...quickSortBooks(left), pivot, ...quickSortBooks(right)];
};

module.exports = {
    quickSortBooks,
};

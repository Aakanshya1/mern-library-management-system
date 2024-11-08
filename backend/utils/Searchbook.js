const binarySearchBooks = (books, prefix) => {
    if (!prefix || typeof prefix !== 'string') {
        throw new Error("Invalid prefix provided for search.");
    }

    let left = 0;
    let right = books.length - 1;
    const normalizedPrefix = prefix.toLowerCase();
    let results = []; 

    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const bookTitle = books[mid]?.title?.toLowerCase() || ''; 
        
   
        if (bookTitle.startsWith(normalizedPrefix)) {
        
            results.push(books[mid]);

            let leftIndex = mid - 1;
            while (leftIndex >= 0 && books[leftIndex]?.title?.toLowerCase().startsWith(normalizedPrefix)) {
                results.unshift(books[leftIndex]); 
                leftIndex--;
            }
            
        
            let rightIndex = mid + 1;
            while (rightIndex < books.length && books[rightIndex]?.title?.toLowerCase().startsWith(normalizedPrefix)) {
                results.push(books[rightIndex]); 
                rightIndex++;
            }
            
            return results; 
        }

      
        if (bookTitle < normalizedPrefix) { 
            left = mid + 1; 
        } else {
            right = mid - 1; 
        }
    }

    return []; 
};
const binarySearchbyIsbn =(books,isbn)=>{
    if(!isbn || typeof isbn !=='string'){
        throw new Error("Invalid Book isbn number for search");
    }
    let left = 0;
    let right = books.length -1 ;
    const normalizedisbn = isbn;
    let results =[];
    while(left<= right){
        const mid = Math.floor((left + right)/2);
        const bookIsbn = books[mid]?.isbn;

        if(bookIsbn.startsWith(normalizedisbn)){
        
        results.push(books[mid]);

        let leftIndex = mid -1 ;
        while(leftIndex >= 0 && books[leftIndex]?.isbn.startsWith(normalizedisbn)){
            results.unshift(books[leftIndex]);
            leftIndex--;
        }
        let rightIndex = mid +1 ;
        while(rightIndex < books.length && books[rightIndex]?.isbn.startsWith(normalizedisbn)){
            results.push(books[rightIndex]);
           rightIndex ++;
        }
        return results;
        }

        if(bookIsbn < normalizedisbn){
            left = mid + 1;
        }
        else{
            right = mid -1 ;
        }
    }
    return [];
}
module.exports = {
    binarySearchBooks,binarySearchbyIsbn
};

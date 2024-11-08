const binarySearchUser = (users,prefix)=>{
    if(!prefix || typeof prefix !== 'string'){
        throw new Error("Invalid prefix provided for search");
    }

    let left = 0;
    let right = users.length -1;
    const normalizedPrefix = prefix.toLowerCase();
    let results=[];

    while(left <= right){
        const mid =  Math.floor((left + right)/2);
        const userName = users[mid]?.firstname?.toLowerCase() || '';

        if(userName .startsWith(normalizedPrefix)){
            results.push(users[mid]);

            let leftIndex =  mid -1;
            while (leftIndex >=0 && users[leftIndex]?.firstname?.toLowerCase().startsWith(normalizedPrefix)){
                results.unshift(users[leftIndex]);
                leftIndex--;
            }

            let rightIndex = mid + 1;
            while(rightIndex < users.length && users[rightIndex]?.firstname?.toLowerCase().startsWith(normalizedPrefix) ){
                results.push(users[rightIndex]);;
                rightIndex++;
            }

            return results;
        }
        if(userName < normalizedPrefix){
            left = mid + 1;
        }
        else{
            right = mid -1 ;
        }
        
    }
    return [];
} 
module.exports = {
    binarySearchUser
}
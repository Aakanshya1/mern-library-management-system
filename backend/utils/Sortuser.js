const quickSortUsers = (users)=>{
    if(users.length <= 1) 
    return users;
    const pivot = users[users.length -1];
    const left =[];
    const right = [];

    for (let i = 0 ; i < users.length -1; i++) {
        if(users[i].firstname.toLowerCase()<pivot.firstname.toLowerCase()){
            left.push(users[i]);
        }
    }
    return [...quickSortUsers(left),pivot,...quickSortUsers(right)];
};
module.exports ={
    quickSortUsers
}
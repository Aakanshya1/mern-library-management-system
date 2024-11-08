 const UserModel =  require('../Models/Userdata');
 const { binarySearchUser} = require('../utils/Searchuser'); 
const { quickSortUsers } = require('../utils/Sortuser');

const getAllUsers = async () =>{
    try{
        const users = await UserModel.find({});
        return users;
    }catch(error){
        throw new Error('Error Fetching users from the database');
    }
}

const SearchUserByName = async(firstname)=>{
 const users = await getAllUsers();   
 const sortedUsers = quickSortUsers(users);
 return binarySearchUser(sortedUsers, firstname);
}

const SortByName = async(firstname)=>{
    const users = await getAllUsers();
    const filteredUsers = users.filter(user => user.firstname.toLowerCase().includes(firstname.toLowerCase()));
    return filteredUsers.length > 1 ? quickSortUsers(filteredUsers):filteredUsers;   
}
module.exports ={
    SortByName, getAllUsers, SearchUserByName
}
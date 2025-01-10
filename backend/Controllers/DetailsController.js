const cloudinary = require('../utils/cloudinary');
const UserModel = require('../Models/Userdata');
const { quickSortUsers } = require('../utils/Sortuser');
const { getAllUsers } = require('../Services/Userservice');
;


//Edit and update user profile by user
const userdisplay = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized, user ID missing' });
        }

        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.phone = req.body.phone || user.phone;
        user.email = req.body.email || user.email;

        // Upload new avatar to Cloudinary if provided
        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'avatars',
                public_id: `${user._id}_avatar`,
                width: 300,
                crop: "scale"
            });

            // Set Cloudinary URL as the user's avatar
            user.avatar = result.secure_url;
        }

        // Hash the password if it's provided
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        // Save the updated user data
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            phone: updatedUser.phone,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
        });
    } catch (error) {
        console.error('Error updating user data:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//display user details of logged in user
const showuser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Admin and libraian sees all user 
const showAlluser  = async(req,res)=>{
    try {
        const users = await UserModel.find();
        const sortedUsers = quickSortUsers(users, 'firstname')
        if(sortedUsers.length==0){
            return res.status(404).json({message:"No users Found"})
        }
        res.status(200).json({
            success:true,
            message:"users retrived successfully",
            users:users,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
}

//Edit user details by admin
const userUpdate = async(req,res)=>{
    try {
        const {_id} = req.params;
        const user = await UserModel.findById(_id);

        if(!user){
            return res.status(400).json({message:"user id found"});
        }
        user.firstname = req.body.firstname || user.firstname;
        user.lastname = req.body.lastname || user.lastname;
        user.phone = req.body.phone || user.phone;
        user.email = req.body.email || user.email;
        user.role = req.body.role|| user.role;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            phone: updatedUser.phone,
            email: updatedUser.email,
            role:updatedUser.role,
        })
    } catch (error) {
        console.error('Error updating user:',error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
//Delete user
const userDelete = async(req,res)=>{
    try {
        const {_id} = req.params;
        const user = await UserModel.findByIdAndDelete(_id);

        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully",
            deletedUser:user,
        })
        
       
    } catch (error) {
        console.error('Error updating user:',error);
        res.status(500)
        .json({message:"Internal Server Error"});
    }
}

//Admin and librarian searches for user by their name (binary search used)
const SearchUserByName = async (req, res) =>{
    const {firstnameprefix} = req.query;
    console.log(firstnameprefix);
    try {
        if(!firstnameprefix){
            return res.status(400)
            .json({ success: false, message: "firstname is required for search" });
        }
        const users = await getAllUsers();
        const sortedUsers = quickSortUsers(users);

        const foundUsers = sortedUsers.filter(user =>
            user.firstname.toLowerCase().startsWith(firstnameprefix.toLowerCase())
        );
        if (foundUsers.length) {
            res.status(200).json({
                success: true,
                users: foundUsers
            });
            
        } else {
            res.status(404).json({
                success: false,
                message: 'No users found with the given firstname'
            });
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { userdisplay, showuser,showAlluser,userUpdate,userDelete, SearchUserByName };

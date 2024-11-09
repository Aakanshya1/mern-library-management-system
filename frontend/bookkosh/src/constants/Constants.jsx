import { IoHomeSharp,IoSearch,IoBagHandle } from "react-icons/io5";
import { GiBookshelf } from "react-icons/gi";
import { FaUser,FaBookOpen,FaStar, FaBriefcase } from "react-icons/fa";
import book from '../assets/images/book.jpg'
import book2 from '../assets/images/book2.jpg'
import book3 from '../assets/images/book3.jpg'
import book4 from '../assets/images/book4.jpg'
import book5 from '../assets/images/book5.jpg'
import Ratings from "../components/Ratings";
import Button from '../components/Button'
export const usersidebar=[
    {
        logo:<IoHomeSharp/>,
        link:"Home",
        path:'userdashboard'
    },
    {
        logo:<IoSearch/>,
        link:"Search",
        path:'search'
    },
    {
        logo:<GiBookshelf/>,
        link:"Myshelf",
        path:"myshelf"
    }, {
        logo:<IoBagHandle/>,
        link:"Contribution",
        path:"contribution"
    }, {
        logo:<FaUser/>,
        link:"User",
        path:"user"
    },
]


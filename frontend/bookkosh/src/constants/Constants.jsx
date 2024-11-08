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
export const userdashpoints=[
    {
        logo:<FaBookOpen />,
        points:"6",
        pointname:"Borrowed books",
    },
    {
        logo:<FaStar />,
        points:"22",
        pointname:"Points Earned",
    },
    {
        logo:<FaBriefcase/>,
        points:"2",
        pointname:"Contribution",
    },
]
export const bookslist=[
    {
        img: <img src={book} className="w-fit" />,
        title:"Harry Potter",
        category:"Sci-Fic",
        author:"J. K. Rowling",
        ratings:<Ratings/>,
        availability:"available",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        
    },
    {
        img: <img src={book2} className="w-fit"/>,
        title:"The Hunger Games",
        category:"Thriller",
        author:" Suzanne Collins",
        ratings:<Ratings />,
        availability:"Borrowed",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",

        
    },
    {
        img: <img src={book3} className="w-fit" />,
        title:"Twilight",
        category:"Romance",
        author:"Stephenie Meyer",
        ratings:<Ratings/>,
        availability:"available",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",

    },
    {
        img: <img src={book4} className="w-fit"/>,
        title:"The Fault in Our Stars",
        category:"Fiction",
        author:"John Green",
        ratings:<Ratings/>,
        availability:"Borrowed",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",


    },
    {
        img: <img src={book5} className="w-fit"/>,
        title:"Romeo and Juliet",
        category:"Romance",
        author:"William Shakespeare",
        ratings:<Ratings/>,
        availability:"Borrowed",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",

    },
    {
        img: <img src={book} className="w-fit" />,
        title:"Harry Potter",
        category:"Sci-Fic",
        author:"William Shakespeare",
        ratings:<Ratings/>,
        availability:"available",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",

    },
    {
        img: <img src={book2}  className="w-fit"/>,
        title:"Harry Potter",
        category:"Sci-Fic",
        author:"J. K. Rowling",
        ratings:<Ratings/>,
        availability:"Borrowed",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    }
    
]
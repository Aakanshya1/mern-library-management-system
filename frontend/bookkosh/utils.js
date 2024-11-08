import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const handleSuccess = (msg) => {
    toast.success(msg);
};

export const handleError = (msg) => {
    toast.error(msg);
};

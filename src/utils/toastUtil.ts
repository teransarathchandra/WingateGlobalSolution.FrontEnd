import toast from 'react-hot-toast';

const toastUtil = {
    success: (message) => {
        console.log('message', message)
        toast.success(message, {
            // Customization options
            duration: 4000,
            position: 'top-right',
        });
    },
    error: (message) => {
        toast.error(message, {
            // Customization options
            duration: 4000,
            position: 'top-right',
        });
    },
    info: (message) => {
        toast(message, { // Default toast for informational messages
            duration: 4000,
            position: 'top-right',
        });
    },
    // Add more custom functions as needed
};

export default toastUtil;
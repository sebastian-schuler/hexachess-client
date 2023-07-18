import { toast } from 'react-toastify';

export const useToast = (message: string) => {
    return () => toast(message, {
        className: 'bg-dark-800',
        bodyClassName: 'text-white',
        progressClassName: 'bg-primary-500',
    });
}
import { toastClasses } from '@/components/Toast/Root';
import { ToastContext, ToastContextDefaults } from '@/context/ToastContext';
import { useContext } from 'react';

const useToast = () => {
    const { setToastState } = useContext(ToastContext);

    const toast = (title: string, description: string, color: keyof typeof toastClasses.color) => {
        setToastState({
		isToastOpen: true,
		title,
		description,
		color,
		});
    };


	const stopToast = () => {
		setToastState(ToastContextDefaults);
	}

   
    return { toast , stopToast };
};

export default useToast;

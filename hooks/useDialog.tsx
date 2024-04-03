import { useContext } from 'react';
import { UserInterfaceContext } from '@/context/UserInterfaceContext';

const useDialog = () => {
    const { setInteractivity } = useContext(UserInterfaceContext);

    const showDialog = (activeDialogIdentifier: string) => {
        setInteractivity((prevState) => ({
            ...prevState,
            showDialog: true,
            activeDialogIdentifier,
        }));
    };

    const setDialogIdentifier = (activeDialogIdentifier: string) => {
        setInteractivity((prevState) => ({
            ...prevState,
            activeDialogIdentifier,
        }));
    };

    return { showDialog, setDialogIdentifier };
};

export default useDialog;
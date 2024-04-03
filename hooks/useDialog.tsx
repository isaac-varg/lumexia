import { useContext } from 'react';
import { DialogContext, DialogContextDefaults } from '@/context/DialogContext';

const useDialog = () => {
    const { setDialogState } = useContext(DialogContext);

    const showDialog = (activeDialogIdentifier: string) => {
        setDialogState((prevState) => ({
            ...prevState,
            isDialogOpen: true,
            activeDialogIdentifier,
        }));
    };

    const resetDialogContext = () => {
        setDialogState(DialogContextDefaults)
    }

    const setDialogIdentifier = (activeDialogIdentifier: string) => {
        setDialogState((prevState) => ({
            ...prevState,
            activeDialogIdentifier,
        }));
    };

    return { showDialog, resetDialogContext, setDialogIdentifier };
};

export default useDialog;
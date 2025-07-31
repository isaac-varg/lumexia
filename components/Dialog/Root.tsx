"use client";
import { DialogContext } from "@/context/DialogContext";
import useDialog from "@/hooks/useDialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as Dialog from "@radix-ui/react-dialog";

import React, { useContext } from "react";

type DialogRootProps = {
    children: React.ReactNode;
    identifier: string;
};

const Root = ({ children, identifier }: DialogRootProps) => {
    const { isDialogOpen, activeDialogIdentifier } = useContext(DialogContext);
    const { resetDialogContext } = useDialog();

    const handleDialogChange = (isOpen: boolean) => {
        if (!isOpen) {
            resetDialogContext();
        }
    }

    if (activeDialogIdentifier !== identifier) {
        return null;
    }



    return (

        <Dialog.Root open={isDialogOpen} onOpenChange={handleDialogChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-900/50 data-[state=open]:animate-overlayShow fixed inset-0">
                    <Dialog.Content aria-describedby="Dialog content" className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-3/5 max-w-3/5 translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-8 shadow-[hsl(206_22%_7%/35%)_0px_10px_38px_-10px,hsl(206_22%_7%/20%)_0px_10px_20px_-15px] focus:outline-none">
                        <VisuallyHidden.Root> <Dialog.Title>Dialog</Dialog.Title></VisuallyHidden.Root>
                        {children}
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root >
    );
};


export default Root;

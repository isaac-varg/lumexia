import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";
import ActionButton, { actionButtonClasses } from "../ActionButton";

type ContentProps = {
    children: React.ReactNode;
    title: string;
    action: () => void;
    actionLabel: string
    actionColor: keyof typeof actionButtonClasses.colors;
    cancelAction?: () => void;
};

const Content = ({ children, title, action, actionLabel = 'Deplete', actionColor = 'alert', cancelAction }: ContentProps) => {
    return (
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-neutral-900/50 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-8 shadow-[hsl(206_22%_7%/35%)_0px_10px_38px_-10px,hsl(206_22%_7%/20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="font-poppins font-bold text-xl">
                    {title}
                </AlertDialog.Title>
                <div className="flex flex-col gap-y-4">
                    <AlertDialog.Description className="font-poppins text-base ">
                        {children}
                    </AlertDialog.Description>
                    <div className="flex flex-row justify-end items-center gap-x-4 ">
                        {cancelAction && (
                            <AlertDialog.Cancel asChild>
                                <ActionButton color="warning" onClick={cancelAction}>Cancel</ActionButton>
                            </AlertDialog.Cancel>
                        )}
                        <AlertDialog.Action asChild>
                            <ActionButton onClick={action} color={actionColor} >
                                {actionLabel}
                            </ActionButton>
                        </AlertDialog.Action>
                    </div>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};

export default Content;

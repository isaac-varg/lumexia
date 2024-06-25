"use client";
import { DialogContext } from "@/context/DialogContext";
import useDialog from "@/hooks/useDialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useContext } from "react";

const Root = ({ children, identifier }: { children: React.ReactNode, identifier: string }) => {
  const { isDialogOpen, activeDialogIdentifier } = useContext(DialogContext);
  const { resetDialogContext } = useDialog();

  const handleDialogChange = () => {
    resetDialogContext();
  };

  if (activeDialogIdentifier !== identifier) {
    return null;
  }

  return <AlertDialog.Root open={isDialogOpen} onOpenChange={handleDialogChange}>{children}</AlertDialog.Root>;
};

export default Root;

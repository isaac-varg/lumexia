"use client";

import useDialog from "@/hooks/useDialog";
import { useEffect } from "react";

type NewDialogProps = {
  dialogIdentifier: string;
  ctrlPlusKey?: string;
};

const NewDialog = ({ dialogIdentifier, ctrlPlusKey = "c"}: NewDialogProps) => {
  const { showDialog } = useDialog();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === ctrlPlusKey) {
        event.preventDefault();
        showDialog(dialogIdentifier);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ctrlPlusKey, dialogIdentifier, showDialog]);
  return false;
};

export default NewDialog;

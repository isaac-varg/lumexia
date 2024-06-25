import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";

const Trigger = ({ children }: { children: React.ReactNode }) => {
  return <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>;
};

export default Trigger;

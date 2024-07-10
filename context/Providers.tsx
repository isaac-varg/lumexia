import React from "react";
import DialogContextProvider from "./DialogContext";
import ToastContextProvider from "./ToastContext";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <DialogContextProvider>
      <ToastContextProvider>{children}</ToastContextProvider>
    </DialogContextProvider>
  );
};

export default Providers;

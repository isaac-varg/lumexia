import React from "react";
import DialogContextProvider from "./DialogContext";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <DialogContextProvider>{children}</DialogContextProvider>;
};

export default Providers;
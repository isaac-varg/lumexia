import React from "react";
import UserInterfaceContextProvider from "./UserInterfaceContext";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <UserInterfaceContextProvider>{children}</UserInterfaceContextProvider>;
};

export default Providers;
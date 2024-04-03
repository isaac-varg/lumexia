"use client";

import React, { useState, createContext } from "react";

interface UserInterfaceState {
  showDialog: boolean;
  activeDialogIdentifier: string | null;
}

interface UserInterfaceProps extends UserInterfaceState {
  setInteractivity: React.Dispatch<React.SetStateAction<UserInterfaceState>>;
}

export const UserInterfaceContext = createContext<UserInterfaceProps>({
  showDialog: false,
  activeDialogIdentifier: null,
  setInteractivity: () => {},
});

type UserInterfaceContextProps = {
  children: React.ReactNode;
};
// allows us to reset from hooks or elsewhere
export const UserInterfaceContextDefaults = {
  showDialog: false,
  activeDialogIdentifier: null,
};

export const UserInterfaceContextProvider = ({
  children,
}: UserInterfaceContextProps) => {
  const [interactivity, setInteractivity] = useState<UserInterfaceState>(
    UserInterfaceContextDefaults
  );

  return (
    <UserInterfaceContext.Provider
      value={{ ...interactivity, setInteractivity }}
    >
      {children}
    </UserInterfaceContext.Provider>
  );
};

export default UserInterfaceContextProvider;

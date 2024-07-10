"use client";

import { toastClasses } from "@/components/Toast/Root";
import React, { useState, createContext } from "react";

interface ToastState {
  isToastOpen: boolean;
  title: string;
  description: string;
  color: keyof typeof toastClasses.color;
}

interface ToastProps extends ToastState {
  setToastState: React.Dispatch<React.SetStateAction<ToastState>>;
}

export const ToastContext = createContext<ToastProps>({
  isToastOpen: false,
  title: "Title",
  description: "Description",
  color: "default",
  setToastState: () => {},
});

type ToastContextProps = {
  children: React.ReactNode;
};
// allows us to reset from hooks or elsewhere
export const ToastContextDefaults: ToastState = {
  isToastOpen: false,
  title: "Title",
  description: "Description",
  color: "default" ,
};

export const ToastContextProvider = ({ children }: ToastContextProps) => {
  const [dialogState, setToastState] =
    useState<ToastState>(ToastContextDefaults);

  return (
    <ToastContext.Provider value={{ ...dialogState, setToastState }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;

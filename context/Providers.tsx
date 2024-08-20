import React from "react";
import DialogContextProvider from "./DialogContext";
import ToastContextProvider from "./ToastContext";
import ProductionWizardContextProvider from "./ProductionWizardContext";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <DialogContextProvider>
      <ToastContextProvider>
        <ProductionWizardContextProvider>
          {children}
        </ProductionWizardContextProvider>
      </ToastContextProvider>
    </DialogContextProvider>
  );
};

export default Providers;

import React from "react";
import DialogContextProvider from "./DialogContext";
import ToastContextProvider from "./ToastContext";
import ProductionWizardContextProvider from "./ProductionWizardContext";
import ProductionContextProvider from "./ProductionContext";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <DialogContextProvider>
      <ToastContextProvider>
        <ProductionWizardContextProvider>
        <ProductionContextProvider>
          {children}
          </ProductionContextProvider>
        </ProductionWizardContextProvider>
      </ToastContextProvider>
    </DialogContextProvider>
  );
};

export default Providers;

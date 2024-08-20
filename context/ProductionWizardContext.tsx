"use client"

import { Item } from "@/types/item";
import React, { useState, createContext } from "react";

// tells what items are in the context state (what we are managing)
interface ProductionWizardState {
  selectedProducibleMaterial: Item | null
}

// provides props, which is the state and the state setter function
interface ProductionWizardProps extends ProductionWizardState {
  setProductionWizardState: React.Dispatch<React.SetStateAction<ProductionWizardState>>;
}

// exports the context for use
export const ProductionWizardContext = createContext<ProductionWizardProps>({
  selectedProducibleMaterial: null,
  setProductionWizardState: () => {} 
});


// defines the defaults so that we can reset via a hook
export const ProductionWizardContextDefaults = {
  selectedProducibleMaterial: null,
};

// provides props to the exporoted provider
type ProductionWizardContextProps = {
  children: React.ReactNode;
};


// the provider for this context/state
export const ProductionWizardContextProvider = ({
  children,
}: ProductionWizardContextProps) => {
  const [productionWizardState, setProductionWizardState] = useState<ProductionWizardState>(
    ProductionWizardContextDefaults 
  );

  return (
    <ProductionWizardContext.Provider
      value={{ ...productionWizardState, setProductionWizardState }}
    >
      {children}
    </ProductionWizardContext.Provider>
  );
};

export default ProductionWizardContextProvider;



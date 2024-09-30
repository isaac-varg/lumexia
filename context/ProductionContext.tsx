"use client"

import React, { createContext, useState } from "react"

interface ProductionState {
  isSecondaryVerificationMode: boolean
}

interface ProductionProps extends ProductionState {
  setProductionState: React.Dispatch<React.SetStateAction<ProductionState>>
}


export const ProductionContext = createContext<ProductionProps>({
  isSecondaryVerificationMode: false,
  setProductionState: () => { },
})



export const ProductionContextDefaults = {
  isSecondaryVerificationMode: false,
}

type ProductionContextProps = {
  children: React.ReactNode;
}


export const ProductionContextProvider = ({ children }: ProductionContextProps) => {

  const [productionState, setProductionState] = useState<ProductionState>(ProductionContextDefaults)

  return (
    <ProductionContext.Provider
      value={{ ...productionState, setProductionState }}
    >
      {children}
    </ProductionContext.Provider >
  )
}


export default ProductionContextProvider;



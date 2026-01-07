'use client'

import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice";
import BasicsPanels from "../basics/BasicsPanels"
import ProductsHeader from "./ProductsHeader"
import NormalMode from "./NormalMode";
import AddMode from "./AddMode";
import { useEffect } from "react";

export type FinishedProductsMode = "normal" | "add";

const FinishedProducts = () => {

  const { finishedProductsMode, selectedFinishedProduct, finishedProducts } = usePricingSharedSelection()
  const { setSelectedFinishedProduct } = usePricingSharedActions()

  useEffect(() => {
    if (!selectedFinishedProduct && finishedProducts && finishedProducts.length !== 0) {
      setSelectedFinishedProduct(finishedProducts[0]);
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <BasicsPanels />

      <ProductsHeader />

      {finishedProductsMode === 'normal' && <NormalMode />}

      {finishedProductsMode === 'add' && <AddMode />}



    </div>
  )
}

export default FinishedProducts

'use client'
import SectionTitle from "@/components/Text/SectionTitle"
import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { TbPlus } from "react-icons/tb"

const ProductsHeader = () => {

  const { setFinishedProductsMode, setModifyMode, setModifyCurrentStep } = usePricingSharedActions()
  const { finishedProductsMode: mode } = usePricingSharedSelection()


  return (
    <div className="flex justify-between items-center">

      <SectionTitle>Finished Products</SectionTitle>

      {mode === 'normal' && (
        <button
          className="btn btn-primary flex gap-2 items-center"
          onClick={() => {
            setModifyMode('new');
            setFinishedProductsMode('modify')

          }}
        >
          <TbPlus className="size-6" />
          Add Product
        </button>
      )}

      {mode === 'modify' && (
        <button
          className="btn btn-warning flex gap-2 items-center"
          onClick={() => {
            setModifyCurrentStep(0);
            setFinishedProductsMode('normal')
          }}
        >
          Cancel
        </button>
      )}

    </div>
  )
}

export default ProductsHeader

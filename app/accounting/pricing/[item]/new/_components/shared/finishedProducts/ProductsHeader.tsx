'use client'
import SectionTitle from "@/components/Text/SectionTitle"
import useDialog from "@/hooks/useDialog"
import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"
import { TbPlus, TbTemplate } from "react-icons/tb"
import SaveButton from "../modifyFinishedProducts/SaveButton"
import AddTemplateDialog from "./AddTemplateDialog"

const ProductsHeader = () => {

  const { setFinishedProductsMode, setModifyMode, setModifyCurrentStep } = usePricingSharedActions()
  const { finishedProductsMode: mode } = usePricingSharedSelection()
  const { showDialog } = useDialog()



  return (
    <div className="flex justify-between items-center">

      <SectionTitle>Finished Products</SectionTitle>

      {mode === 'normal' && (
        <div className="flex gap-2">
          <button
            className="btn btn-secondary flex gap-2 items-center"
            onClick={() => showDialog('addTemplateDialog')}
          >
            <TbTemplate className="size-5" />
            Add Template
          </button>
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
        </div>
      )}

      <AddTemplateDialog />

      {mode === 'modify' && (
        <div className="flex gap-2 items-center">
          <button
            className="btn btn-warning flex gap-2 items-center"
            onClick={() => {
              setModifyCurrentStep(0);
              setFinishedProductsMode('normal')
            }}
          >
            Cancel
          </button>

          <SaveButton />
        </div>
      )}

    </div>
  )
}

export default ProductsHeader

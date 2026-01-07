'use client'

import { FinishedProductFromProduced } from "@/actions/accounting/finishedProducts/getByProducedItem"
import { FinishedProductFromPurchased } from "@/actions/accounting/finishedProducts/getByPurchasedItem"
import { usePricingSharedActions, usePricingSharedSelection } from "@/store/pricingSharedSlice"

const classes = {
  bgColor: {
    invalid: 'btn-danger btn-outline',
    pending: 'btn-outline',
    valid: 'btn-success btn-outline',
    selected: 'btn-accent'
  }
}

type Props = {
  finishedProduct: FinishedProductFromPurchased | FinishedProductFromProduced | null
}

const ProductButton = ({ finishedProduct }: Props) => {
  const { selectedFinishedProduct } = usePricingSharedSelection()
  const { setSelectedFinishedProduct } = usePricingSharedActions()

  let bg: keyof typeof classes.bgColor = 'pending';
  const isSelected = selectedFinishedProduct?.id === finishedProduct?.id;

  if (isSelected) { bg = 'selected' }



  return (
    <button
      className={`btn btn-lg ${classes.bgColor[bg]} `}
      onClick={() => setSelectedFinishedProduct(finishedProduct)}
    >
      <div className="flex justify-between items-center">
        <div>
          {finishedProduct?.name}
        </div>
        <div className="flex gap-2">

        </div>

      </div>
    </button>
  )
}

export default ProductButton

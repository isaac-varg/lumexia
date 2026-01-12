'use client'
import PageTitle from "@/components/Text/PageTitle"
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"

const Header = () => {
  const { item } = usePricingSharedSelection()
  if (!item) return false;

  return (
    <div className="flex justify-between items-center">
      <PageTitle>{`Pricing Determination - ${item.name}`}</PageTitle>

      <div className="flex gap-2">

        <button
          className="btn btn-success btn-lg"
        >
          Complete
        </button>

      </div>

    </div>
  )
}

export default Header

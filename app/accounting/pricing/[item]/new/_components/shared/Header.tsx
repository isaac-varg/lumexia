'use client'
import PageTitle from "@/components/Text/PageTitle"
import { usePricingSharedSelection } from "@/store/pricingSharedSlice"
import CompleteButton from "./CompleteButton"

const Header = () => {
  const { item } = usePricingSharedSelection()
  if (!item) return false;


  return (
    <div className="flex justify-between items-center">
      <PageTitle>{`Pricing Determination - ${item.name}`}</PageTitle>

      <div className="flex gap-2">

        <CompleteButton />

      </div>

    </div>
  )
}

export default Header

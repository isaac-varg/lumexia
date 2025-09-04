'use client'
import PageTitle from "@/components/Text/PageTitle"
import { useProductionSelection } from "@/store/productionSlice"
import { TbSlash } from "react-icons/tb"

const Header = () => {

  const { bpr } = useProductionSelection()

  if (!bpr) return <Skeleton />

  return (
    <div className="flex justify-between items-center">

      <PageTitle>{`${bpr.mbpr.producesItem.name}`}</PageTitle>



      <PageTitle>
        <div className="flex gap-2 items-center">
          <span>#{bpr.referenceCode}</span>
          <TbSlash />
          <span>{bpr.lotOrigin?.lot.lotNumber}</span>
        </div>
      </PageTitle>

    </div>
  )
}

const Skeleton = () => {
  return (

    <div className="flex justify-between items-center">
      <div className="skeleton w-60 h-4" />

      <div className="skeleton w-60 h-4" />
    </div>
  )
}

export default Header

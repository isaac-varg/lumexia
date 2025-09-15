'use client'
import PageTitle from "@/components/Text/PageTitle"
import { useProductionSelection } from "@/store/productionSlice"
import { useRouter } from "next/navigation"
import { TbSlash } from "react-icons/tb"

const Header = () => {

  const { bpr } = useProductionSelection()
  const router = useRouter()

  if (!bpr) return <Skeleton />

  return (
    <div className="flex justify-between items-center">

      <PageTitle>{`${bpr.mbpr.producesItem.name}`}</PageTitle>



      <div className="py-1  px-4 rounded-xl bg-accent/35 hover:bg-accent/50 hover:cursor-pointer" onClick={() => router.push(`/production/planning/${bpr.referenceCode}?id=${bpr.id}`)}>
        <PageTitle>
          <div className="flex gap-2 items-center">
            <span>#{bpr.referenceCode}</span>
            <TbSlash />
            <span>{bpr.lotOrigin?.lot.lotNumber}</span>
          </div>
        </PageTitle>

      </div>

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

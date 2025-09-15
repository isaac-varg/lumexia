'use client'
import PageTitle from "@/components/Text/PageTitle"
import { useBprDetailsSelection } from "@/store/bprDetailsSlice"
import { TbSlashes } from "react-icons/tb"

const Title = () => {

  const { bpr } = useBprDetailsSelection()

  if (!bpr) {
    return <Skeleton />
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">

      <div className='font-poppins font-bold text-5xl'>
        {bpr.mbpr.producesItem.name}
      </div>
      <div className='font-poppins font-bold text-5xl'>

        <div className="flex gap-4 items-center">
          <span>BPR #{bpr.referenceCode}</span>
          <TbSlashes className="size-8" />
          <span>{bpr.lotOrigin?.lot.lotNumber}</span>
        </div>
      </div>
    </div>
  )
}

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="w-1/3 skeleton h-18" />

      <div className="w-2/3 skeleton h-18" />
    </div>
  )
}

export default Title

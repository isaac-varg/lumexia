'use client'
import PageTitle from "@/components/Text/PageTitle"
import { useItemSelection } from "@/store/itemSlice"
import ActionButtons from "./ActionButtons"

const TitleRow = () => {

  const { item } = useItemSelection()

  if (!item) return <Skeleton />

  return (
    <div className="flex justify-between items-center">

      <PageTitle>{item.name}</PageTitle>

      <ActionButtons />

    </div>
  )
}

export default TitleRow

// skeleton

const Skeleton = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="skeleton w-[400px] h-8" ></div>

      <div className="flex gap-x-2">

        <div className="skeleton w-40 h-8" />
        <div className="skeleton w-40 h-8" />
      </div>

    </div>
  )
}

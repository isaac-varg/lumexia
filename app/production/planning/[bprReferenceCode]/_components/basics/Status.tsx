'use client'
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import useDialog from "@/hooks/useDialog"
import ChangeStatusDialog from "./StatusDialog"
import { useBprDetailsSelection } from "@/store/bprDetailsSlice"
import Card from "@/components/Card"

const Statuses = () => {

  const { bpr } = useBprDetailsSelection()
  const { showDialog } = useDialog()

  const handleStatusClick = () => {
    showDialog('changeBprStatus')
  }

  return (
    <Card.Root>
      <ChangeStatusDialog />
      <Card.Title size="small">Status</Card.Title>


      <div
        onClick={() => handleStatusClick()}
        style={{ backgroundColor: bpr?.status.bgColor }}
        className="flex flex-col h-full items-center justify-center px-4 py-2 rounded-xl col-span-2 hover:!bg-lilac-300 hover:cursor-pointer"
      >
        <div style={{ color: bpr?.status.textColor }} className=" font-poppins text-3xl font-semibold">
          {bpr?.status.name || 'None'}
        </div>
      </div>








    </Card.Root>

  )

}

export default Statuses

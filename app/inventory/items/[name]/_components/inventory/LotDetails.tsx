import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { TbArrowLeft, TbPlusMinus, TbQrcode } from "react-icons/tb"
import { printLotLabel } from "../../_actions/inventory/printLotLabel"
import { Lot } from "@/types/lot"
import useDialog from "@/hooks/useDialog"
import TransactionDialog from "./TransactionDialog"
import Card from "@/components/Card"

const LotDetails = () => {


  const { setLotsViewMode, setSelectedLot } = useItemActions()
  const { selectedLot } = useItemSelection()
  const { showDialog } = useDialog()

  const handleBack = () => {
    setLotsViewMode('table')
    setSelectedLot(null);
  }

  const printLabel = async () => {
    await printLotLabel(selectedLot as any)
  }


  return (
    <div className="col-span-3">
      <TransactionDialog />

      <div className="flex flex-col gap-y-6">      <div className="flex flex-row justify-between items-center">
        <button className="btn btn-secondary flex gap-x-2" onClick={() => handleBack()} >
          <TbArrowLeft className="text-2xl" />
          <p>Back</p>
        </button>

        <div className="flex gap-x-2">
          <button className="btn btn-accent flex gap-x-2" onClick={() => printLabel()} >
            <TbQrcode className="text-2xl" />
            <p>Print Label</p>
          </button>
          <button className="btn btn-accent flex gap-x-2"
            onClick={() => showDialog("transactionDialog")}
          >
            <TbPlusMinus className="text-2xl" />
            <p>Create Transation</p>
          </button>
        </div>
      </div>


        <Card.Root>
          todo
          <ul className="list">
            <li>show audit history</li>
            <li>show transactions</li>
            <li>how about some lot notes? useful for when something goes wrong</li>
            <li>split this card into multiple cards with each of these elements...</li>
          </ul>

        </Card.Root>

      </div>


    </div>
  )
}

export default LotDetails

import { useItemActions, useItemSelection } from "@/store/itemSlice"
import { TbArrowLeft, TbPlusMinus, TbQrcode } from "react-icons/tb"
import { printLotLabel } from "../../_actions/inventory/printLotLabel"
import { Lot } from "@/types/lot"
import useDialog from "@/hooks/useDialog"
import TransactionDialog from "./TransactionDialog"
import Card from "@/components/Card"
import { useEffect } from "react"
import TransactionsTable from "./TransactionsTable"
import LotBasics from "./LotBasics"
import LotNotes from "./LotNotes"

const LotDetails = () => {


  const { setLotsViewMode, setSelectedLot, getSelectedLotTransactions, getSelectedLotNotes } = useItemActions()
  const { selectedLot, selectedLotTransactions } = useItemSelection()
  const { showDialog } = useDialog()


  const handleBack = () => {
    setLotsViewMode('table')
    setSelectedLot(null);
  }

  const printLabel = async () => {
    await printLotLabel(selectedLot as any)
  }

  useEffect(() => {
    getSelectedLotTransactions();
    getSelectedLotNotes();
  }, [selectedLot])


  return (
    <div className="col-span-3">
      <TransactionDialog />

      <div className="flex flex-col gap-y-6">
        <div className="flex flex-row justify-between items-center">
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

        <div className="grid grid-cols-2 gap-6">

          <LotBasics />
          <LotNotes />


          <TransactionsTable />

        </div>

      </div>


    </div>
  )
}

export default LotDetails

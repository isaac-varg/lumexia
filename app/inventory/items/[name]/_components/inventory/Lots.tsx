import Card from "@/components/Card"
import DataTable from "@/components/DataTable"
import { useItemSelection } from "@/store/itemSlice"
import { lotsColumns } from "./LotsColumns"
import { Filter } from "@/types/filter"
import { AnimatePresence, motion } from "framer-motion"
import LotsTable from "./LotsTable"
import LotDetails from "./LotDetails"
import SectionTitle from "@/components/Text/SectionTitle"

export type LotsViewMode = 'table' | 'lot';

const Lots = () => {

  const { lotsViewMode, selectedLot } = useItemSelection()
  const title = lotsViewMode === 'table' ? 'Lots' : `Lot ${selectedLot?.lotNumber}`;

  return (

    <div className="col-span-3">

      <div className="flex flex-col gap-y-6">
        <SectionTitle>{title}</SectionTitle>


        <AnimatePresence mode="wait">
          <motion.div
            key={lotsViewMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {lotsViewMode === 'table' && <LotsTable />}
            {lotsViewMode === 'lot' && <LotDetails />}
          </motion.div>
        </AnimatePresence>
      </div>


    </div>
  )
}

export default Lots

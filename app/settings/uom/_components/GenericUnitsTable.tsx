'use client'
import DataTable from "@/components/DataTable"
import { genericUnitsColumns } from "./GenericUnitColumns"
import { ItemWithGenericUnits } from "../_functions/getItemsWithUnits"
import { Uom } from "@/actions/inventory/getAllUom"
import { useState } from "react"
import SetConversionFactor from "./SetConversionFactor"
import useDialog from "@/hooks/useDialog"

const GenericUnitsTable = ({ items, uoms }: { items: ItemWithGenericUnits[], uoms: Uom[] }) => {


    const [selectedItem, setSelectedItem] = useState<ItemWithGenericUnits | null>(null)
    const { showDialog } = useDialog()


    return (
        <>
            <SetConversionFactor uoms={uoms} selectedItem={selectedItem} />
            <DataTable.Default
                data={items}
                columns={genericUnitsColumns}
                onRowClick={(row) => {
                    setSelectedItem(row.original)
                    showDialog('setUnitConversionFactor')
                }}
                tableStateName='itemWithGenericUnits'

            />
        </>
    )
}

export default GenericUnitsTable

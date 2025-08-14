'use client'

import { ItemAlias } from "@/actions/inventory/aliases/getByItem"
import LabelDataPair from "@/components/Text/LabelDataPair"
import { staticRecords } from "@/configs/staticRecords"
import useDialog from "@/hooks/useDialog"
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"

const Aliases = () => {

    const { aliases } = useItemDashboardSelection()
    const { setSelectedAlias, setAliasDialogMode } = useItemDashboardActions()
    const { showDialog } = useDialog()

    const handleClick = (alias: ItemAlias) => {
        setAliasDialogMode('modify')
        setSelectedAlias(alias)
        showDialog('aliasDialog')
    }

    return (
        <div>
            {aliases.map((alias: ItemAlias) => {


                if (alias.aliasTypeId === staticRecords.inventory.aliases.types.supplier) {

                    if (!alias.supplierAlias[0]) {
                        throw new Error("no supplier alias found")
                    }
                    return <LabelDataPair
                        key={alias.id}
                        onClick={() => handleClick(alias)}
                        label={`${alias.supplierAlias[0].supplier.name}`}
                        data={alias.name}
                    />

                }

                return (
                    <LabelDataPair
                        key={alias.id}
                        label={alias.aliasType ? alias.aliasType.name : "Alias"}
                        onClick={() => handleClick(alias)}
                        data={alias.name}
                    />
                )
            })}

        </div>
    )
}

export default Aliases

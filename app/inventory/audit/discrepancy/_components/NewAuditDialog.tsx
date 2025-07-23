'use client'
import Dialog from "@/components/Dialog"
import { ItemType } from "@prisma/client"

const NewAuditDialog = ({ itemTypes }: { itemTypes: ItemType[] }) => {

    const handleClick = (itemTypeId: string | null) => {

        if (!itemTypeId) console.log('none')

        if (itemTypeId) console.log('has it')

    }

    return (
        <Dialog.Root identifier="newDiscrepancyAuditDialog">

            <Dialog.Title>New Discrepancy Audit</Dialog.Title>

            <div className="grid grid-cols-3 gap-4">

                <button className="btn" onClick={() => handleClick(null)}>All</button>
                {itemTypes.map(it => {
                    return (
                        <button key={it.id} className="btn" onClick={() => handleClick(it.id)}>
                            {it.name}
                        </button>
                    )
                })}

            </div>

        </Dialog.Root>
    )
}

export default NewAuditDialog

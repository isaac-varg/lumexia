"use client"
import React from 'react'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import { staticRecords } from '@/configs/staticRecords'
import useDialog from '@/hooks/useDialog'
import { BprBomItemInventory } from '@/actions/inventory/inventory/getAllByBom'
import MaterialAllocationDialog from './MaterialAllocationDialog'
import { usePlanningDashboardActions } from '@/store/planningDashboardSlice'

const classes = {
    bg: {
        insufficient: 'bg-red-300',
        sufficient: '',
    }
}

const MaterialSufficiencyLine = ({ material }: { material: BprBomItemInventory }) => {

    const { showDialog } = useDialog()
    const { setSelectedBomItem } = usePlanningDashboardActions()

    const isConsumable = material.bom.item.inventoryTypeId === staticRecords.inventory.inventoryTypes.consumable;
    const available = isConsumable ? 'Consumable' : toFracitonalDigits.weight(material.totalQuantityAvailable);

    const isAvailableSufficient = material.totalQuantityAvailable >= material.quantity;
    const bgClasses: keyof typeof classes.bg = isAvailableSufficient || isConsumable ? 'sufficient' : 'insufficient'

    const handleClick = () => {
        setSelectedBomItem(material)
        showDialog(`allocation${material.id}`)
    }

    return (
            <tr className={`${classes.bg[bgClasses]} hover:bg-neutral-200 hover:cursor-pointer`} onClick={() => handleClick()}>
                <th>{material.bom.identifier}</th>
                <td>{material.bom.item.name}</td>
                <td>{toFracitonalDigits.weight(material.quantity)}</td>
                <td>{isConsumable ? 'Consumable' : available}</td>
                <td>{isConsumable ? <progress className='progress ' value={100} max={100} /> : <progress className='progress' value={material.totalQuantityAvailable} max={material.quantity}></progress>}</td>
            </tr>
    )
}

export default MaterialSufficiencyLine

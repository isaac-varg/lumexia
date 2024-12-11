import React from 'react'
import { MaterialsBom } from './MaterialSufficiency'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import { staticRecords } from '@/configs/staticRecords'
import useDialog from '@/hooks/useDialog'
import MaterialAllocationDialog from './MaterialAllocationDialog'

const classes = {
    bg: {
        insufficient: 'bg-red-300',
        sufficient: '',
    }
}

const MaterialSufficiencyLine = ({ material }: { material: MaterialsBom }) => {

    const { showDialog } = useDialog()

    const isConsumable = material.bom.item.inventoryTypeId === staticRecords.inventory.inventoryTypes.consumable;
    const available = isConsumable ? 'Consumable' : toFracitonalDigits.weight(material.totalQuantityAvailable);

    const isAvailableSufficient = material.totalQuantityAvailable >= material.quantity;
    const bgClasses: keyof typeof classes.bg = isAvailableSufficient || isConsumable ? 'sufficient' : 'insufficient'

    const handleClick = () => {
        showDialog(`allocation${material.id}`)
    }

    return (
        <>
        <MaterialAllocationDialog material={material}/>

        <tr className={`${classes.bg[bgClasses]} hover:bg-neutral-200 hover:cursor-pointer`} onClick={() => handleClick()}>
            <th>{material.bom.identifier}</th>
            <td>{material.bom.item.name}</td>
            <td>{toFracitonalDigits.weight(material.quantity)}</td>
            <td>{available}</td>
            <td>{isConsumable ? <progress className='progress' /> : <progress className='progress' value={material.totalQuantityAvailable} max={material.quantity}></progress>}</td>
        </tr>
        </>
    )
}

export default MaterialSufficiencyLine

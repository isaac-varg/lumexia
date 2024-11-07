import React from 'react'
import { MaterialsBom } from './MaterialSufficiency'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import { staticRecords } from '@/configs/staticRecords'

const MaterialSufficiencyLine = ({ material }: { material: MaterialsBom }) => {

    const isConsumable = material.bom.item.inventoryTypeId === staticRecords.inventory.inventoryTypes.consumable;
    const available = isConsumable ? 'Consumable' : toFracitonalDigits.weight(material.totalQuantityAvailable);

    return (
        <tr>
            <th>{material.bom.identifier}</th>
            <td>{material.bom.item.name}</td>
            <td>{toFracitonalDigits.weight(material.quantity)}</td>
            <td>{available}</td>
            <td>{isConsumable ? <progress className='progress' /> :<progress className='progress' value={material.totalQuantityAvailable} max={material.quantity}></progress>}</td>
        </tr>
    )
}

export default MaterialSufficiencyLine

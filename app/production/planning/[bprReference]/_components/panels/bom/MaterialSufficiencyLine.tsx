"use client"
import React from 'react'
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits'
import { staticRecords } from '@/configs/staticRecords'
import useDialog from '@/hooks/useDialog'
import { BprBomItemInventory } from '@/actions/inventory/inventory/getAllByBom'
import MaterialAllocationDialog from './MaterialAllocationDialog'
import { usePlanningDashboardActions } from '@/store/planningDashboardSlice'
import { DateTime } from 'luxon'
import { TbX } from 'react-icons/tb'

const classes = {
    bg: {
        insufficient: 'bg-red-300',
        sufficient: '',
    }
}

const getByDateDirection = (arr: any[], direction: 'oldest' | 'newest' = 'oldest') => {
    if (!arr || arr.length === 0) {
        return null;
    }

    return arr.reduce((accumulator, current) => {
        const accumulatorDate = DateTime.fromISO(accumulator.createdAt);
        const currentDate = DateTime.fromISO(current.createdAt);

        if (direction === 'newest') {
            return accumulatorDate > currentDate ? accumulator : current;
        } else {
            return accumulatorDate < currentDate ? accumulator : current;
        }
    });
}

const UserIcon = ({ image, name }: { image: string, name: string }) => {
    return (
        <div className="tooltip" data-tip={name}>
            <div className="flex gap-x-4">
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src={image} />
                    </div>
                </div>

            </div>

        </div>
    )
}

const RedX = () => {
    return (
        <span className='text-2xl text-red-400'><TbX /></span>
    )
}

const MaterialSufficiencyLine = ({ material, isDraft }: { material: BprBomItemInventory, isDraft: boolean }) => {

    const { showDialog } = useDialog()
    const { setSelectedBomItem } = usePlanningDashboardActions()

    const isConsumable = material.bom.item.inventoryTypeId === staticRecords.inventory.inventoryTypes.consumable;
    const available = isConsumable ? 'Consumable' : toFracitonalDigits.weight(material.totalQuantityAvailable);

    const isAvailableSufficient = material.totalQuantityAvailable >= material.quantity;
    const bgClasses: keyof typeof classes.bg = isAvailableSufficient || isConsumable ? 'sufficient' : 'insufficient'
    const hasStagings = material.BprStaging.length !== 0
    const stagings = hasStagings ? material.BprStaging[0] : null
    const primaryVerification = (stagings) ? getByDateDirection(stagings.BprStagingVerification, 'oldest') : null;

    const secondaryVerification =  stagings ? getByDateDirection(stagings.BprStagingVerification, 'newest') : null;

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
            {isDraft && <td>{isConsumable ? <progress className='progress ' value={100} max={100} /> : <progress className='progress' value={material.totalQuantityAvailable} max={material.quantity}></progress>}</td>}
            {!isDraft && (stagings?.pulledByUser ? <td><UserIcon image={stagings.pulledByUser.image || ''} name={stagings.pulledByUser.name || ''} /></td> : <td><RedX /></td>)}
            {!isDraft && (primaryVerification ? <td><UserIcon image={primaryVerification.user.image || ''} name={primaryVerification.user.name || ''} /></td> : <td><RedX /></td>)}
            {!isDraft && (secondaryVerification ? <td><UserIcon image={secondaryVerification.user.image || ''} name={secondaryVerification.user.name || ''} /></td> : <td><RedX /></td>)}
        </tr>
    )
}

export default MaterialSufficiencyLine

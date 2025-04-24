import { PurchasedItem } from '@/actions/inventory/getPurchasedItems';
import Search from '@/components/Search/Search'
import React, { Dispatch, SetStateAction, useState } from 'react'
import ScanListener from './ScanListener';

type ItemStepProps = {
    items: PurchasedItem[];
    nextStep: () => void;
    setItem: Dispatch<SetStateAction<string>>
    currentStep: number
}
const ItemStep = ({ items, nextStep, currentStep, setItem }: ItemStepProps) => {

    const [mode, setMode] = useState<'find' | 'add'>('find')

    const handleItemSelection = (value: string) => {
        setItem(value);
        nextStep()
    }

    if (currentStep !== 0) {
        return null
    }
    return (
        <div className='grid grid-cols-2 gap-8'>
            <Search
                data={items}
                keys={['name', 'aliases']}
                onClick={handleItemSelection}
            />
            <ScanListener handleItemSelection={handleItemSelection}/>
        </div>
    )
}

export default ItemStep

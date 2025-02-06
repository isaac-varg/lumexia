import { Item } from '@/actions/inventory/getItems'
import { PurchasedItem } from '@/actions/inventory/getPurchasedItems';
import Search from '@/components/Search/Search'
import React, { Dispatch, SetStateAction, useState } from 'react'

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
        <div>
            <Search
                data={items}
                keys={['name', 'aliases']}
                onClick={handleItemSelection}
            />
        </div>
    )
}

export default ItemStep

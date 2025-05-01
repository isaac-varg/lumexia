import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem'
import { FinishedProductFromPurchased } from '@/actions/accounting/finishedProducts/getByPurchasedItem'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    onSelect: Dispatch<SetStateAction<FinishedProductFromPurchased | null>>
    finishedProduct: FinishedProductFromPurchased
    selectedFinishedProductId: string

}

const FinishedProductCard = ({ onSelect, finishedProduct, selectedFinishedProductId }: Props) => {

    const isSelected = finishedProduct.id === selectedFinishedProductId;

    const handleClick = () => {
        onSelect(finishedProduct)
    }

    return (
        <div
            className={`${isSelected ? 'bg-emerald-300' : 'bg-slate-200'} w-full hover:bg-slate-300 hover:text-slate-800 hover:cursor-pointer text-slate-900 p-4 rounded-lg flex items-center justify-center`}
            onClick={() => handleClick()}
        >
            <div className='font-poppins font-semibold text-lg'>{finishedProduct.name}</div>
        </div>

    )
}

export default FinishedProductCard

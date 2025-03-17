import React from 'react'
import { IItemSearchData } from '../_functions/getItems'
import Dialog from '@/components/Dialog'
import ItemSearch from './ItemSearch'

const BeginPricingExamDialog = ({ items }: { items: IItemSearchData[] }) => {
    return (
        <Dialog.Root identifier='beginPricingExamDialog'>

            <Dialog.Title>Begin Pricing Exam</Dialog.Title>

            <ItemSearch items={items} />
        </Dialog.Root>
    )
}

export default BeginPricingExamDialog

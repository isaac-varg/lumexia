import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import { Item } from '@/types/item'
import React from 'react'

const ProducedMain = ({ item }: { item: Item }) => {
    return (
        <div className='flex flex-col gap-y-4'>
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />
        </div>
    )
}

export default ProducedMain

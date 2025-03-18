import { productionActions } from '@/actions/production'
import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import { Item } from '@/types/item'
import React from 'react'

const ProducedMain = async ({ item }: { item: Item }) => {

    const mbprs = await productionActions.mbprs.getByItem(item.id); 

    console.log(mbprs)
     

    return (
        <div className='flex flex-col gap-y-4'>
            <PageTitle>Pricing Determination - {item.name}</PageTitle>
            <PageBreadcrumbs />
        </div>
    )
}

export default ProducedMain

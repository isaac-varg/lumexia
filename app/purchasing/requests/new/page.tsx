import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import PageTitle from '@/components/Text/PageTitle'
import React from 'react'
import MainPanel from './_components/MainPanel'
import { inventoryActions } from '@/actions/inventory'

const NewRequestPage = async () => {

    const items = await inventoryActions.getPurchasedItems(); 

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex justify-between items-center'>

                <div className='flex flex-col gap-y-4'>
                    <PageTitle>Create Request</PageTitle>
                    <PageBreadcrumbs />
                </div>
                <div>
                </div>
            </div>

            <MainPanel items={items} />
        </div>

    )
}

export default NewRequestPage 

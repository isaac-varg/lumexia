'use client'
import { Search } from '@/components/Search'
import Text from '@/components/Text'
import SectionTitle from '@/components/Text/SectionTitle'
import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice'
import React  from 'react'
import { ProducibleItem } from '../../_functions/getProducibles'

const ItemStep = ({ producibles }: { producibles: ProducibleItem[] }) => {

    const { step } = useMbprWizardSelection()
    const { setProducesItem } = useMbprWizardActions()

    if (step !== 0) return false

    return (
        <div>
            <div className='text-center'>
                <SectionTitle >Item</SectionTitle>

                <Text.Normal>Select the item that is to be produced by this Master Batch Production Record</Text.Normal>

            </div>

            <Search.SearchWithResults
                keys={["mergedAliases", "name"]}
                data={producibles}
                onClick={(itemId) => setProducesItem(itemId)}
            />

        </div>
    )
}

export default ItemStep

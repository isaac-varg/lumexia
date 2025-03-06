import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { getContainerCost } from '@/app/accounting/pricing/_calculations/getContainerCost';
import { usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice';
import React, { useState } from 'react'
import DataCard from '../shared/DataCard';
import DataCardText from '../shared/DataCardText';
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits';
import { getMarkup } from '@/app/accounting/pricing/_calculations/getMarkup';

type Props = {
    selectedConsumerContainer: FilledConsumerContainer | null;
}

const SelectedConsumerContainerPanel = ({ selectedConsumerContainer }: Props) => {

    if (!selectedConsumerContainer) { return false }
    const { itemCost } = usePricingPurchasedSelection()
    const containerCost = getContainerCost(selectedConsumerContainer, itemCost)
    const [consumerPrice, setConsumnerPrice] = useState<number>(selectedConsumerContainer.consumerPrice)
    const [markup, setMarkup] = useState<number>(getMarkup(containerCost, consumerPrice));
    

    

    return (
        <div className='flex flex-col gap-y-6'>
        <div className='text-center'>
            <h1 className='font-poppins text-3xl font-semibold'>{selectedConsumerContainer.consumerContainer.containerItem.name}</h1>

            </div>

            <div className='grid grid-cols-3 gap-4'>
                <DataCard>
                    <DataCardText size='small' color='light'>
                        Filled Container Cost
                    </DataCardText>
                    <DataCardText>
                        {toFracitonalDigits.curreny(containerCost)}
                    </DataCardText>
                    <DataCardText size='tiny' color='light'>
                        $ / container
                    </DataCardText>
                </DataCard>

                <DataCard>
                    <DataCardText size='small' color='light'>
                    Consumer Price
                    </DataCardText>
                    <DataCardText>
                        $ {toFracitonalDigits.curreny(selectedConsumerContainer.consumerPrice)} 
                    </DataCardText>
                    <DataCardText size='tiny' color='light'>
                        {markup} % markup 
                    </DataCardText>
                </DataCard>

                <DataCard>
                    <DataCardText size='small' color='light'>
                        Profit
                    </DataCardText>
                    <DataCardText>
                        {toFracitonalDigits.curreny(containerCost)}
                    </DataCardText>
                    <DataCardText size='tiny' color='light'>
                            2 % profit 
                    </DataCardText>
                </DataCard>
            </div>


            <div className=''>

                
            </div>

        </div>
    )
}

export default SelectedConsumerContainerPanel

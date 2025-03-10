
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { getContainerCost } from '@/app/accounting/pricing/_calculations/getContainerCost';
import { usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice';
import React, { useState } from 'react'
import DataCard from '../shared/DataCard';
import DataCardText from '../shared/DataCardText';
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits';
import AlterModeButton, { AlterMode } from '../shared/AlterModeButton';

type Props = {
    selectedConsumerContainer: FilledConsumerContainer | null;
}

const SelectedConsumerContainerPanel = ({ selectedConsumerContainer }: Props) => {
    if (!selectedConsumerContainer) return null;


    const { itemCost } = usePricingPurchasedSelection();
    const containerCost = getContainerCost(selectedConsumerContainer, itemCost);

    const [alterMode, setAlterMode] = useState<AlterMode>('consumerPrice');
    // this is soo friggin messy. not sure why is use  zustand and react state...



    //    const handleInterimUpdate = (updateType: 'consumerPrice' | 'markup' | 'profit', value: string) => {
    //
    //        if (value === "") {
    //            setConsumerPrice('')
    //            setMarkup("");
    //            updateInterimConsumerContainers(selectedConsumerContainer.id, 0, 0, 0, 0);
    //            return;
    //        }
    //
    //        const isFloat = validator.isFloat(value, { locale: 'en-US' });
    //
    //        if (!isFloat) {
    //            console.log('not considrerd float')
    //            return;
    //        };
    //
    //        const floatValue = parseFloat(value)
    //
    //
    //        switch (updateType) {
    //            case 'consumerPrice': {
    //                // value is consumerprice in this case 
    //                const markup = getMarkup(containerCost, floatValue);
    //                const profit = getProfit(containerCost, floatValue);
    //                const profitPercentrage = getProfitPercentage(profit, containerCost)
    //                setConsumerPrice(value)
    //                updateInterimConsumerContainers(selectedConsumerContainer.id, floatValue, markup, profit, profitPercentrage);
    //                break;
    //            }
    //            case 'markup': {
    //                // value is markup
    //                const consumerPrice = getConsumerPrice(containerCost, floatValue);
    //                const profit = getProfit(containerCost, consumerPrice)
    //                const profitPercentrage = getProfitPercentage(profit, containerCost)
    //                setMarkup(value);
    //                updateInterimConsumerContainers(selectedConsumerContainer.id, consumerPrice, floatValue, profit, profitPercentrage)
    //                break;
    //            }
    //            case 'profit': {
    //                // value is profit
    //                const consumerPrice = containerCost + floatValue
    //                const markup = getMarkup(containerCost, consumerPrice);
    //                const profitPercentage = getProfitPercentage(floatValue, containerCost);
    //                updateInterimConsumerContainers(selectedConsumerContainer.id, consumerPrice, markup, floatValue, profitPercentage)
    //                break;
    //            }
    //            default:
    //                console.error('Update type not valid.')
    //                break;
    //        }
    //    }
    //
    //    useEffect(() => {
    //        if (!interimData) {
    //            const consumerPrice = selectedConsumerContainer.consumerPrice
    //            const markup = getMarkup(containerCost, consumerPrice);
    //            const profit = getProfit(containerCost, consumerPrice)
    //            const profitPercentrage = getProfitPercentage(profit, containerCost)
    //            updateInterimConsumerContainers(selectedConsumerContainer.id, consumerPrice, markup, profit, profitPercentrage)
    //        }
    //    }, [interimData])
    //

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='text-center'>
                <h1 className='font-poppins text-3xl font-semibold'>{selectedConsumerContainer.consumerContainer.containerItem.name}</h1>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <DataCard>
                    <DataCardText size='small' color='light'>Filled Container Cost</DataCardText>
                    <DataCardText>{toFracitonalDigits.curreny(containerCost)}</DataCardText>
                    <DataCardText size='tiny' color='light'>$ / container</DataCardText>
                </DataCard>

                <DataCard>
                    <DataCardText size='small' color='light'>Consumer Price</DataCardText>
                    <DataCardText>$ {0}</DataCardText>
                    <DataCardText size='tiny' color='light'>{0} % markup</DataCardText>
                </DataCard>

                <DataCard>
                    <DataCardText size='small' color='light'>Profit</DataCardText>
                    <DataCardText>{0}</DataCardText>
                    <DataCardText size='tiny' color='light'>{0} % profit</DataCardText>
                </DataCard>
            </div>



            <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-poppins text-xl font-semibold'>
                        Alter By
                    </h1>

                    <div className='grid grid-cols-2 gap-2'>
                        <AlterModeButton alterModeId='consumerPrice' currentMode={alterMode} label='Consumer Price' onSelect={setAlterMode} />
                        <AlterModeButton alterModeId='markup' currentMode={alterMode} label='Markup Percentage' onSelect={setAlterMode} />
                        <AlterModeButton alterModeId='profit' currentMode={alterMode} label='Profit' onSelect={setAlterMode} />
                        <AlterModeButton alterModeId='profitPercentage' currentMode={alterMode} label='Profit Percentage' onSelect={setAlterMode} />
                    </div>
                </div>


                <div className='flex flex-col gap-4'>
                    <h1 className='font-poppins text-xl font-semibold'>
                        Value
                    </h1>

                    {alterMode === 'consumerPrice' && (
                        <input
                            type='text'
                            className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
                        />
                    )}

                    {alterMode === 'markup' && (
                        <input
                            type='text'
                            className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
                        />
                    )}

                </div>
            </div>


        </div>
    );
};

export default SelectedConsumerContainerPanel;


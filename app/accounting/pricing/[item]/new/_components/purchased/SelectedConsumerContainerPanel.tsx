
import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { getContainerCost } from '@/app/accounting/pricing/_calculations/getContainerCost';
import { usePricingPurchasedActions, usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice';
import React, { useEffect, useState } from 'react'
import DataCard from '../shared/DataCard';
import DataCardText from '../shared/DataCardText';
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits';
import AlterModeButton, { AlterMode } from '../shared/AlterModeButton';
import { getMarkup } from '@/app/accounting/pricing/_calculations/getMarkup';
import { getProfit } from '@/app/accounting/pricing/_calculations/getProfit';
import { getProfitPercentage } from '@/app/accounting/pricing/_calculations/getProfitPercentage';
import { getConsumerPrice } from '@/app/accounting/pricing/_calculations/getConsumerPrice';
import validator from 'validator';
import Text from '@/components/Text';

type Props = {
    selectedConsumerContainer: FilledConsumerContainer | null;
}

const SelectedConsumerContainerPanel = ({ selectedConsumerContainer }: Props) => {
    if (!selectedConsumerContainer) return null;


    const { itemCost, isContainerParametersPanelShown } = usePricingPurchasedSelection();
    const { getInterimConsumerContainer, updateInterimConsumerContainer } = usePricingPurchasedActions()
    const containerCost = getContainerCost(selectedConsumerContainer, itemCost);

    const [alterMode, setAlterMode] = useState<AlterMode>('consumerPrice');

    const [consumerPrice, setConsumerPrice] = useState<number>(0);
    const [markup, setMarkup] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);
    const [profitPercentage, setProfitPercentage] = useState<number>(0);

    const updatePricingCalculations = (event: any) => {

        const value = validator.isEmpty(event.target.value) ? 0 : parseFloat(event.target.value);

        let cp = 0; // consumer price
        let m = 0; // markup
        let p = 0; // profit
        let pp = 0; // profit percentage

        switch (alterMode) {
            case 'consumerPrice': {
                cp = value;
                m = getMarkup(containerCost, cp);
                p = getProfit(containerCost, cp);
                pp = getProfitPercentage(p, containerCost);
                break;
            }
            case 'markup': {
                m = value;
                cp = getConsumerPrice(containerCost, m);
                p = getProfit(containerCost, cp);
                pp = getProfitPercentage(p, containerCost);
                break;
            }
            case 'profit': {
                p = value;
                cp = p + containerCost;
                pp = getProfitPercentage(p, containerCost);
                m = getMarkup(containerCost, cp);
                break;
            }
            case 'profitPercentage': {
                pp = value;
                p = (pp / 100) * containerCost
                cp = p + containerCost;
                m = getMarkup(containerCost, cp);
                break;
            }
            default:
                break;
        }

        // update states
        setConsumerPrice(cp)
        setMarkup(m)
        setProfit(p)
        setProfitPercentage(pp)

        // safe to zustand for rentention between container switches
        updateInterimConsumerContainer(selectedConsumerContainer.id, cp)
    }

    useEffect(() => {

        const interimData = getInterimConsumerContainer(selectedConsumerContainer.id);

        const consumerPrice = interimData ? interimData.consumerPrice : selectedConsumerContainer.consumerPrice

        const markup = getMarkup(containerCost, consumerPrice);
        const profit = getProfit(containerCost, consumerPrice);
        const profitPercentage = getProfitPercentage(profit, containerCost);

        // set state
        setConsumerPrice(consumerPrice);
        setMarkup(markup)
        setProfit(profit)
        setProfitPercentage(profitPercentage)

    }, [selectedConsumerContainer])




    return (
        <div className='flex flex-col gap-y-6'>
            <div className='text-center'>
                <h1 className='font-poppins text-3xl font-semibold'>{selectedConsumerContainer.consumerContainer.containerItem.name}</h1>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <DataCard>
                    <DataCardText size='small' color='light'>Filled Container Cost</DataCardText>
                    <div className="tooltip" data-tip="You can see more details on how this number was calculated by using the toggle below.">
                        <DataCardText>{toFracitonalDigits.curreny(containerCost)}</DataCardText>
                        <DataCardText size='tiny' color='light'>$ / container</DataCardText>
                    </div>
                </DataCard>

                <DataCard>
                    <div className='tooltip' data-tip="Markup % = [(Consumer Price - Overall Container Cost )/ Overall Container Cost ] * 100">
                        <DataCardText size='small' color='light'>Consumer Price</DataCardText>
                        <DataCardText>$ {consumerPrice}</DataCardText>
                        <DataCardText size='tiny' color='light'>{markup} % markup</DataCardText>
                    </div>
                </DataCard>

                <DataCard>
                    <DataCardText size='small' color='light'>Profit</DataCardText>
                    <DataCardText>{profit}</DataCardText>
                    <DataCardText size='tiny' color='light'>{profitPercentage} % profit</DataCardText>
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
                            value={consumerPrice}
                            onChange={updatePricingCalculations}
                            className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
                        />
                    )}

                    {alterMode === 'markup' && (
                        <input
                            type='text'
                            value={markup}
                            onChange={updatePricingCalculations}
                            className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
                        />
                    )}

                    {alterMode === 'profit' && (
                        <input
                            type='text'
                            value={profit}
                            onChange={updatePricingCalculations}
                            className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
                        />
                    )}

                    {alterMode === 'profitPercentage' && (
                        <input
                            type='text'
                            value={profitPercentage}
                            onChange={updatePricingCalculations}
                            className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
                        />
                    )}

                </div>
            </div>

            {isContainerParametersPanelShown && (
                <div className='flex flex-col gap-y-6'>

                    <div className='flex flex-col gap-y-4'>
                        <h1 className='font-poppins text-xl font-semibold'>
                            Filled Container Costs
                        </h1>

                        <p className='font-poppins text-xl font-normal'>
                            These are are parameters are unique this product filled into this container.
                        </p>

                        <div className='flex flex-col gap-y-1'>
                            <Text.LabelDataPair
                                label='Fill Quantity'
                                data={selectedConsumerContainer.fillQuantity}
                            />
                            <Text.LabelDataPair
                                label='Declared Fill Quantity'
                                data={selectedConsumerContainer.declaredQuantity}
                            />

                            <Text.LabelDataPair
                                label='UOM'
                                data={selectedConsumerContainer.uom.abbreviation}
                            />

                            <Text.LabelDataPair
                                label='Difficulties Cost'
                                data={selectedConsumerContainer.difficultiesCost}
                            />

                        </div>
                    </div>


                    <div className='flex flex-col gap-y-4'>
                        <h1 className='font-poppins text-xl font-semibold'>
                            Global Container Costs
                        </h1>

                        <p className='font-poppins text-xl font-normal'>
                            These are are parameters that affect all products that use this same container.
                        </p>


                        <div className='flex flex-col gap-y-1'>
                            <Text.LabelDataPair
                                label='Container Cost'
                                data={selectedConsumerContainer.consumerContainer.containerCost}
                            />

                            <Text.LabelDataPair
                                label='Fill Labor'
                                data={selectedConsumerContainer.consumerContainer.fillLaborCost}
                            />
                            <Text.LabelDataPair
                                label='Shipping'
                                data={selectedConsumerContainer.consumerContainer.shippingCost}
                            />
                            <Text.LabelDataPair
                                label='Free Shipping'
                                data={selectedConsumerContainer.consumerContainer.freeShippingCost}
                            />
                        </div>
                    </div>

                </div >
            )}
        </div >
    );
};

export default SelectedConsumerContainerPanel;


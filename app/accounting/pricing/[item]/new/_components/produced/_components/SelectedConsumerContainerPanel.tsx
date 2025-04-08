import { FilledConsumerContainer } from '@/actions/accounting/consumerContainers/getAllByFillItem'
import { getContainerCost } from '@/app/accounting/pricing/_calculations/getContainerCost';
import React, { useEffect, useState, useCallback } from 'react'
import DataCard from '../../shared/DataCard';
import DataCardText from '../../shared/DataCardText';
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits';
import AlterModeButton, { AlterMode } from '../../shared/AlterModeButton';
import { getMarkup } from '@/app/accounting/pricing/_calculations/getMarkup';
import { getProfit } from '@/app/accounting/pricing/_calculations/getProfit';
import { getProfitPercentage } from '@/app/accounting/pricing/_calculations/getProfitPercentage';
import { getConsumerPrice } from '@/app/accounting/pricing/_calculations/getConsumerPrice';
import validator from 'validator';
import Text from '@/components/Text';
import { TbEdit, TbTrash } from 'react-icons/tb';
import useDialog from '@/hooks/useDialog';
import EditFilledConsumerContainerDialog from '../../shared/EditFilledConsumerContainerDialog';
import DeleteFilledConsumerContainerAlert from '../../shared/DeleteFilledConsumerContainerAlert';
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSlice';

type Props = {
    selectedConsumerContainer: FilledConsumerContainer | null;
}

const SelectedConsumerContainerPanel = ({ selectedConsumerContainer }: Props) => {
    // Early return moved after hooks to maintain hook order
    const { bomObject, isContainerParametersPanelShown } = usePricingProducedSelection();
    const { getInterimConsumerContainer, updateInterimConsumerContainer } = usePricingProducedActions()
    const { showDialog } = useDialog()

    const [alterMode, setAlterMode] = useState<AlterMode>('consumerPrice');


    // Calculate initial values
    const containerCost = selectedConsumerContainer ? getContainerCost(selectedConsumerContainer, bomObject?.overallBomCostPerLb || 0) : 0;
    const interimData = selectedConsumerContainer ? getInterimConsumerContainer(selectedConsumerContainer.id) : null;

    const initialConsumerPrice = selectedConsumerContainer
        ? (interimData ? interimData.consumerPrice : selectedConsumerContainer.consumerPrice)
        : 0;
    const initialMarkup = selectedConsumerContainer ? getMarkup(containerCost, initialConsumerPrice) : 0;
    const initialProfit = selectedConsumerContainer ? getProfit(containerCost, initialConsumerPrice) : 0;
    const initialProfitPercentage = selectedConsumerContainer ? getProfitPercentage(initialProfit, containerCost) : 0;

    const [consumerPrice, setConsumerPrice] = useState<number>(initialConsumerPrice);
    const [markup, setMarkup] = useState<number>(initialMarkup);
    const [profit, setProfit] = useState<number>(initialProfit);
    const [profitPercentage, setProfitPercentage] = useState<number>(initialProfitPercentage);

    // Memoize the update function to prevent unnecessary recreations
    const updatePricingCalculations = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
                p = (pp / 100) * containerCost;
                cp = p + containerCost;
                m = getMarkup(containerCost, cp);
                break;
            }
            default:
                break;
        }

        // Update states
        setConsumerPrice(cp);
        setMarkup(m);
        setProfit(p);
        setProfitPercentage(pp);

        // Update zustand store if container exists
        if (selectedConsumerContainer) {
            updateInterimConsumerContainer(selectedConsumerContainer.id, { filledConsumerContainerId: selectedConsumerContainer.id, consumerPrice: cp, wasViewed: true, profitPercentage: pp });
        }
    }, [alterMode, containerCost, selectedConsumerContainer, updateInterimConsumerContainer]);

    useEffect(() => {
        if (!selectedConsumerContainer) return;

        const interimData = getInterimConsumerContainer(selectedConsumerContainer.id);
        const consumerPrice = interimData ? interimData.consumerPrice : selectedConsumerContainer.consumerPrice;
        const markup = getMarkup(containerCost, consumerPrice);
        const profit = getProfit(containerCost, consumerPrice);
        const profitPercentage = getProfitPercentage(profit, containerCost);

        if (!interimData) {
            updateInterimConsumerContainer(
                selectedConsumerContainer.id, {
                filledConsumerContainerId: selectedConsumerContainer.id,
                consumerPrice: selectedConsumerContainer.consumerPrice,
                wasViewed: true,
                profitPercentage,
            }
            );
        }

        setConsumerPrice(consumerPrice);
        setMarkup(markup);
        setProfit(profit);
        setProfitPercentage(profitPercentage);
    }, [
        selectedConsumerContainer,
        containerCost,
        getInterimConsumerContainer,
        updateInterimConsumerContainer
    ]);

    if (!selectedConsumerContainer) return null;

    if (!bomObject || !bomObject.overallBomCostPerLb) return null;

    return (
        <div className='flex flex-col gap-y-6'>
            <EditFilledConsumerContainerDialog selectedConsumerContainer={selectedConsumerContainer} />
            <DeleteFilledConsumerContainerAlert produced={true} selectedConsumerContainerId={selectedConsumerContainer.id} />

            <div className='flex justify-between items-center'>
                <h1 className='font-poppins text-3xl font-semibold'>{selectedConsumerContainer.consumerContainer.containerItem.name}</h1>
                <button className='btn btn-outline btn-error btn-sm' onClick={() => showDialog('deleteFilledConsumerContainer')}>
                    <span className='text-xl'><TbTrash /></span>
                </button>
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
                        <DataCardText>$ {toFracitonalDigits.curreny(consumerPrice)}</DataCardText>
                        <DataCardText size='tiny' color='light'>{toFracitonalDigits.digits(markup, 2)} % markup</DataCardText>
                    </div>
                </DataCard>

                <DataCard>
                    <DataCardText size='small' color='light'>Profit</DataCardText>
                    <DataCardText>{toFracitonalDigits.curreny(profit)}</DataCardText>
                    <DataCardText size='tiny' color='light'>{toFracitonalDigits.curreny(profitPercentage)} % profit</DataCardText>
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

                    <input
                        type='number'
                        value={alterMode === 'consumerPrice' ? consumerPrice :
                            alterMode === 'markup' ? markup :
                                alterMode === 'profit' ? profit : profitPercentage}
                        onChange={updatePricingCalculations}
                        className='bg-lilac-300 w-full h-full flex items-center justify-center font-poppins text-2xl font-medium text-center rounded-xl'
                        step={alterMode === 'consumerPrice' || alterMode === 'profit' ? '0.01' : '0.1'}
                    />
                </div>
            </div>

            {isContainerParametersPanelShown && (
                <div className='flex flex-col gap-y-6'>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-poppins text-xl font-semibold'>
                                Filled Container Costs
                            </h1>
                            <button className='btn' onClick={() => showDialog('editFilledConsumerContainer')}>
                                <span className='text-xl flex items-center gap-x-1'><TbEdit /><p> Edit</p></span>
                            </button>
                        </div>

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
                </div>
            )}
        </div>
    );
};

export default SelectedConsumerContainerPanel;

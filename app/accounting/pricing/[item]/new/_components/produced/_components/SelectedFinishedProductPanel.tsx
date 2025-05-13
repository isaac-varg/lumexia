import React, { useEffect, useState, useCallback } from 'react'
import DataCard from '../../shared/DataCard';
import DataCardText from '../../shared/DataCardText';
import { toFracitonalDigits } from '@/utils/data/toFractionalDigits';
import AlterModeButton from '../../shared/AlterModeButton';
import { getMarkup } from '@/app/accounting/pricing/_calculations/getMarkup';
import { getProfit } from '@/app/accounting/pricing/_calculations/getProfit';
import { getProfitPercentage } from '@/app/accounting/pricing/_calculations/getProfitPercentage';
import { getConsumerPrice } from '@/app/accounting/pricing/_calculations/getConsumerPrice';
import validator from 'validator';
import Text from '@/components/Text';
import { TbEdit, TbTrash } from 'react-icons/tb';
import useDialog from '@/hooks/useDialog';
import { usePricingProducedActions, usePricingProducedSelection } from '@/store/pricingProducedSlice';
import { FinishedProductFromProduced } from '@/actions/accounting/finishedProducts/getByProducedItem';
import EditFinishedProductDialog from '../../shared/EditFinishedProductDialog';
import DeleteFinishedProductAlert from '../../shared/DeleteFinishedProductAlert';

type Props = {
    selectedFinishedProduct: FinishedProductFromProduced | null;
}

const SelectedFinishedProductPanel = ({ selectedFinishedProduct }: Props) => {

    const { producedPricingSummations, isContainerParametersPanelShown } = usePricingProducedSelection();
    const { updateInterimFinishedProduct, getInterimFinishedProduct } = usePricingProducedActions()
    const { showDialog } = useDialog()
    const [alterMode, setAlterMode] = useState<'consumerPrice' | 'markup' | 'profitPercentage' | 'profit'>("consumerPrice")
    const [consumerPrice, setConsumerPrice] = useState<number>(0);
    const [markup, setMarkup] = useState<number>(0);
    const [profitPercentage, setProfitPercentage] = useState<number>(0);
    const [profit, setProfit] = useState<number>(0);

    // for alter mode input
    const getValueByAlterMode = () => {
        switch (alterMode) {
            case 'consumerPrice':
                return consumerPrice;
            case 'markup':
                return markup;
            case 'profit':
                return profit;
            default:
                return profitPercentage;
        }
    };


    useEffect(() => {
        // initial state setting
        if (!selectedFinishedProduct) return;

        const interimFinishedProduct = getInterimFinishedProduct(selectedFinishedProduct.id)

        if (interimFinishedProduct) {
            setConsumerPrice(interimFinishedProduct.consumerPrice)
            setMarkup(interimFinishedProduct.markup);
            setProfit(interimFinishedProduct.profit)
            setProfitPercentage(interimFinishedProduct.profitPercentage);
            return;
        }


        setConsumerPrice(selectedFinishedProduct.consumerPrice)
        setMarkup(selectedFinishedProduct.markup)
        setProfitPercentage(selectedFinishedProduct.profitPercentage)
        setProfit(selectedFinishedProduct.profit)

    }, [selectedFinishedProduct])


    const updatePricingCalculations = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

        if (!selectedFinishedProduct) return;

        const value = validator.isEmpty(event.target.value) ? 0 : parseFloat(event.target.value);
        const finishedProductTotalCost = selectedFinishedProduct.calculatedTotals.finishedProductTotalCost

        let cp = 0; // consumer price
        let m = 0; // markup
        let p = 0; // profit
        let pp = 0; // profit percentage

        switch (alterMode) {
            case 'consumerPrice': {
                cp = value;
                m = getMarkup(finishedProductTotalCost, cp);
                p = getProfit(finishedProductTotalCost, cp);
                pp = getProfitPercentage(finishedProductTotalCost, cp);
                break;
            }
            case 'markup': {
                m = value;
                cp = getConsumerPrice(finishedProductTotalCost, m);
                p = getProfit(finishedProductTotalCost, cp);
                pp = getProfitPercentage(finishedProductTotalCost, cp);
                break;
            }
            case 'profit': {
                p = value;
                cp = p + finishedProductTotalCost;
                pp = getProfitPercentage(finishedProductTotalCost, cp);
                m = getMarkup(finishedProductTotalCost, cp);
                break;
            }
            case 'profitPercentage': {
                pp = value;
                cp = (finishedProductTotalCost / (1 - (pp / 100)));
                p = cp - finishedProductTotalCost
                m = getMarkup(finishedProductTotalCost, cp);
                console.log('data', {
                    pp,
                    p,
                    cp,
                    m
                })
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

        // update zustand
        const interimPayload = {
            finishedProductId: selectedFinishedProduct.id,
            finishedProduct: selectedFinishedProduct,
            consumerPrice: cp,
            profit: p,
            markup: m,
            wasViewed: true,
            profitPercentage: pp

        }
        updateInterimFinishedProduct(interimPayload);

    }, [alterMode, selectedFinishedProduct, updateInterimFinishedProduct]);



    if (!selectedFinishedProduct) { return false }




    return (
        <div className='flex flex-col gap-y-6'>
            <EditFinishedProductDialog selectedFinishedProduct={selectedFinishedProduct} />
            <DeleteFinishedProductAlert selectedFinishedProductId={selectedFinishedProduct.id} />

            <div className='flex justify-between items-center'>
                <h1 className='font-poppins text-3xl font-semibold'>{selectedFinishedProduct.name}</h1>
                <button className='btn btn-outline btn-error btn-sm' onClick={() => showDialog('deleteFilledConsumerContainer')}>
                    <span className='text-xl'><TbTrash /></span>
                </button>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <DataCard>
                    <DataCardText size='small' color='light'>Filled Container Cost</DataCardText>
                    <div className="tooltip" data-tip="You can see more details on how this number was calculated by using the toggle below.">
                        <DataCardText>{selectedFinishedProduct.calculatedTotals.finishedProductTotalCost}</DataCardText>
                        <DataCardText size='tiny' color='light'>$ / container</DataCardText>
                    </div>
                </DataCard>

                <DataCard>
                    <div className='tooltip' data-tip="Markup % = [(Consumer Price - Overall Container Cost )/ Overall Container Cost ] * 100">
                        <DataCardText size='small' color='light'>Consumer Price</DataCardText>
                        <DataCardText>$ {toFracitonalDigits.curreny(consumerPrice)}</DataCardText>
                        <DataCardText size='tiny' color='light'>{toFracitonalDigits.curreny(markup)} % markup</DataCardText>
                    </div>
                </DataCard>

                <DataCard>
                    <DataCardText size='small' color='light'>Profit</DataCardText>
                    <DataCardText>{toFracitonalDigits.curreny(profit)}</DataCardText>
                    <DataCardText size='tiny' color='light'>{toFracitonalDigits.curreny(profitPercentage)} % profit margin</DataCardText>
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
                        <AlterModeButton alterModeId='profitPercentage' currentMode={alterMode} label='Profit Margin' onSelect={setAlterMode} />
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <h1 className='font-poppins text-xl font-semibold'>
                        Value
                    </h1>

                    <input
                        type='number'
                        value={getValueByAlterMode()}
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
                            These parameters are unique to this product filled into this container.
                        </p>
                        <div className='flex flex-col gap-y-1'>
                            <Text.LabelDataPair
                                label='Fill Quantity'
                                data={selectedFinishedProduct.fillQuantity}
                            />
                            <Text.LabelDataPair
                                label='Declared Fill Quantity'
                                data={selectedFinishedProduct.declaredQuantity}
                            />
                            <Text.LabelDataPair
                                label='UOM'
                                data={selectedFinishedProduct.fillUom.abbreviation}
                            />
                            <Text.LabelDataPair
                                label='Difficulty Adjustment Cost'
                                data={selectedFinishedProduct.difficultyAdjustmentCost}
                            />
                            <Text.LabelDataPair
                                label='Free Shipping Cost'
                                data={selectedFinishedProduct.freeShippingCost}
                            />
                            <Text.LabelDataPair
                                label="Product Fill Cost"
                                data={selectedFinishedProduct.calculatedTotals.productFillCost}
                            />
                            <Text.LabelDataPair
                                label="Finished Product Total Cost"
                                data={selectedFinishedProduct.calculatedTotals.finishedProductTotalCost}
                            />

                        </div>
                    </div>

                    <div className='flex flex-col gap-y-4'>
                        <h1 className='font-poppins text-xl font-semibold'>
                            Auxiliaries
                        </h1>

                        <p className='font-poppins text-xl font-normal'>
                            Auxiliaries are items that supplement or support the overall packaged finished product. E.g., labels, containers, caps, packaging boxes. These have costs and parameters that are global, i.e., their parameters contribute to all finished goods that utilize the item as an auxiliary.
                        </p>

                        <h1 className="font-poppins font-semibold text-2xl text-neutral-800">
                            Auxiliaries Total: {selectedFinishedProduct.auxiliaries.total}
                        </h1>


                        <div className="grid grid-cols-2 gap-2">


                            {selectedFinishedProduct.auxiliaries.breakdown.map((aux) => {
                                return (
                                    <div
                                        key={aux.auxiliaryItemId}
                                        className="flex flex-col gap-y-2 p-6 bg-neutral-200 rounded-xl"
                                    >
                                        <h1 className="font-poppins text-xl font-medium">
                                            {aux.name}
                                        </h1>

                                        <Text.Normal>Quantity: {aux.quantity}</Text.Normal>
                                        <Text.Normal>Cost: {aux.itemCost}</Text.Normal>
                                        <Text.Normal>Auxiliary Usage Cost: {aux.auxiliaryUsageCost}</Text.Normal>
                                        <Text.Normal>Difficulty Adjustment Cost: {aux.difficultyAdjustmentCost}</Text.Normal>
                                        <Text.Normal>Total Cost: {aux.lineTotal}</Text.Normal>

                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedFinishedProductPanel;

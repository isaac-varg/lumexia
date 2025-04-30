import { usePricingPurchasedActions, usePricingPurchasedSelection } from '@/store/pricingPurchasedSlice';
import React, { useEffect, useState, useCallback } from 'react'
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
import { TbEdit, TbTrash } from 'react-icons/tb';
import useDialog from '@/hooks/useDialog';
import { FinishedProduct } from '@/actions/accounting/finishedProducts/getByItem';
import { getProductFillCost } from '@/app/accounting/pricing/_calculations/getProductFillCost';
import { getFinishedProductTotalCost } from '@/app/accounting/pricing/_calculations/getFinishedProductTotalCost';
import EditFinishedProductDialog from '../shared/EditFinishedProductDialog';
import DeleteFinishedProductAlert from '../shared/DeleteFinishedProductAlert';

type Props = {
    selectedFinishedProduct: FinishedProduct | null;
}

const SelectedFinishedProductPanel = ({ selectedFinishedProduct }: Props) => {

    if (!selectedFinishedProduct) return

    const { itemCost, isContainerParametersPanelShown } = usePricingPurchasedSelection();
    const { getInterimFinishedProduct, updateInterimFinishedProduct } = usePricingPurchasedActions()
    const { showDialog } = useDialog()

    const [alterMode, setAlterMode] = useState<AlterMode>('consumerPrice');

    //  _       _   _       _             _            _       _   _                 
    // (_)_ __ | |_(_) __ _| |   ___ __ _| | ___ _   _| | __ _| |_(_) ___  _ __  ___ 
    // | | '_ \| __| |/ _` | |  / __/ _` | |/ __| | | | |/ _` | __| |/ _ \| '_ \/ __|
    // | | | | | |_| | (_| | | | (_| (_| | | (__| |_| | | (_| | |_| | (_) | | | \__ \
    // |_|_| |_|\__|_|\__,_|_|  \___\__,_|_|\___|\__,_|_|\__,_|\__|_|\___/|_| |_|___/
    //                                                                               
    const productFillCost = selectedFinishedProduct.productFillCost ? selectedFinishedProduct.productFillCost : getProductFillCost(selectedFinishedProduct?.fillQuantity, itemCost)

    const finishedProductTotalCost = selectedFinishedProduct.finishedProductTotalCost ?
        selectedFinishedProduct.finishedProductTotalCost :
        getFinishedProductTotalCost(productFillCost, selectedFinishedProduct.auxiliaries.total, selectedFinishedProduct.difficultyAdjustmentCost, selectedFinishedProduct.freeShippingCost);

    const interimData = selectedFinishedProduct ? getInterimFinishedProduct(selectedFinishedProduct.id) : null;

    const initialConsumerPrice = interimData ? interimData.consumerPrice : selectedFinishedProduct.consumerPrice;
    const initialMarkup = getMarkup(finishedProductTotalCost, initialConsumerPrice);
    const initialProfit = getProfit(finishedProductTotalCost, initialConsumerPrice);
    const initialProfitPercentage = getProfitPercentage(initialProfit, finishedProductTotalCost);


    //      _        _            
    //  ___| |_ __ _| |_ ___  ___ 
    // / __| __/ _` | __/ _ \/ __|
    // \__ \ || (_| | ||  __/\__ \
    // |___/\__\__,_|\__\___||___/
    //                            

    const [consumerPrice, setConsumerPrice] = useState<number>(initialConsumerPrice);
    const [markup, setMarkup] = useState<number>(initialMarkup);
    const [profit, setProfit] = useState<number>(initialProfit);
    const [profitPercentage, setProfitPercentage] = useState<number>(initialProfitPercentage);


    //        __  __           _                     _       _            
    //   ___ / _|/ _| ___  ___| |_   _   _ _ __   __| | __ _| |_ ___  ___ 
    //  / _ \ |_| |_ / _ \/ __| __| | | | | '_ \ / _` |/ _` | __/ _ \/ __|
    // |  __/  _|  _|  __/ (__| |_  | |_| | |_) | (_| | (_| | ||  __/\__ \
    //  \___|_| |_|  \___|\___|\__|  \__,_| .__/ \__,_|\__,_|\__\___||___/
    //                                    |_|                             
    const updatePricingCalculations = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const value = validator.isEmpty(event.target.value) ? 0 : parseFloat(event.target.value);

        let cp = 0; // consumer price
        let m = 0; // markup
        let p = 0; // profit
        let pp = 0; // profit percentage

        switch (alterMode) {
            case 'consumerPrice': {
                cp = value;
                m = getMarkup(finishedProductTotalCost, cp);
                p = getProfit(finishedProductTotalCost, cp);
                pp = getProfitPercentage(p, finishedProductTotalCost);
                break;
            }
            case 'markup': {
                m = value;
                cp = getConsumerPrice(finishedProductTotalCost, m);
                p = getProfit(finishedProductTotalCost, cp);
                pp = getProfitPercentage(p, finishedProductTotalCost);
                break;
            }
            case 'profit': {
                p = value;
                cp = p + finishedProductTotalCost;
                pp = getProfitPercentage(p, finishedProductTotalCost);
                m = getMarkup(finishedProductTotalCost, cp);
                break;
            }
            case 'profitPercentage': {
                pp = value;
                p = (pp / 100) * finishedProductTotalCost;
                cp = p + finishedProductTotalCost;
                m = getMarkup(finishedProductTotalCost, cp);
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
        if (selectedFinishedProduct) {
            updateInterimFinishedProduct({ finishedProductId: selectedFinishedProduct.id, finishedProduct: selectedFinishedProduct, consumerPrice: cp, wasViewed: true, profitPercentage: pp });
        }
    }, [alterMode, finishedProductTotalCost, selectedFinishedProduct, updateInterimFinishedProduct]);

    useEffect(() => {
        if (!selectedFinishedProduct) return;

        const interimData = getInterimFinishedProduct(selectedFinishedProduct.id);
        const consumerPrice = interimData ? interimData.consumerPrice : selectedFinishedProduct.consumerPrice;
        const markup = getMarkup(finishedProductTotalCost, consumerPrice);
        const profit = getProfit(finishedProductTotalCost, consumerPrice);
        const profitPercentage = getProfitPercentage(profit, finishedProductTotalCost);

        if (!interimData) {
            updateInterimFinishedProduct({
                finishedProductId: selectedFinishedProduct.id,
                finishedProduct: selectedFinishedProduct,
                consumerPrice: selectedFinishedProduct.consumerPrice,
                wasViewed: true,
                profitPercentage,
            });
        }

        setConsumerPrice(consumerPrice);
        setMarkup(markup);
        setProfit(profit);
        setProfitPercentage(profitPercentage);
    }, [
        selectedFinishedProduct,
        finishedProductTotalCost,
        getInterimFinishedProduct,
        updateInterimFinishedProduct
    ]);

    if (!selectedFinishedProduct) return null;

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
                        <DataCardText>{toFracitonalDigits.curreny(finishedProductTotalCost)}</DataCardText>
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
                                label='Difficulties Cost'
                                data={selectedFinishedProduct.difficultyAdjustmentCost}
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
                                data={0}
                            />
                            <Text.LabelDataPair
                                label='Fill Labor'
                                data={0}
                            />
                            <Text.LabelDataPair
                                label='Shipping'
                                data={0}
                            />
                            <Text.LabelDataPair
                                label='Free Shipping'
                                data={0}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedFinishedProductPanel;

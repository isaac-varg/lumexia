import Form from '@/components/Form';
import useDialog from '@/hooks/useDialog';
import { usePricingSharedActions, usePricingSharedSelection } from '@/store/pricingSharedSlice';
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { FilledConsumerContainerFormParameters } from '../purchased/AddConsumerContainerDialog';

type Inputs = {
    fillQuantity: number;
    declaredQuantity: number;
    difficultiesCost: number;
    uomId: string;
}

type Props = {
    currentStep: number;
    nextStep: () => void;
    setParameters: Dispatch<SetStateAction<FilledConsumerContainerFormParameters | null>>
    reset: () => void;
}

const SpecifyParametersStep = ({ currentStep, nextStep, setParameters, reset }: Props) => {

    const form = useForm<Inputs>()
    const { uoms } = usePricingSharedSelection()
    const { getUoms } = usePricingSharedActions()
    const uomOptions = uoms.length !== 0 ? uoms.map((u) => { return { label: `${u.name} (${u.abbreviation})`, value: u.id } }) : []

    const handleSubmit = (data: Inputs) => {
        setParameters(data)
        nextStep()
    }

    useEffect(() => {
        if (uoms.length === 0) {
            getUoms()
        }
    }, []);

    if (currentStep !== 1) { return false }

    return (
        <div>
            <Form.Root
                form={form}
                onSubmit={handleSubmit}
            >

                <Form.Number
                    form={form}
                    fieldName='fillQuantity'
                    label='Fill Quantity'
                    required
                />

                <Form.Number
                    form={form}
                    fieldName='declaredQuantity'
                    label='Declared Quantity '
                    required
                />

                <Form.Select
                    form={form}
                    fieldName='uomId'
                    label='UOM'
                    options={uomOptions}
                />

                <Form.Number
                    form={form}
                    fieldName='difficultiesCost'
                    label='Difficulties Cost '
                    required
                />




                <div className='flex justify-end gap-x-2'>
                    <button className='btn btn-warning' type='button' onClick={reset}>Cancel</button>
                    <button className='btn btn-success' type='submit'>Save</button>


                </div>

            </Form.Root>
        </div>
    )
}

export default SpecifyParametersStep

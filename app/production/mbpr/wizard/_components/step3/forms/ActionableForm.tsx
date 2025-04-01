import Form from '@/components/Form';
import { useMbprWizardActions, useMbprWizardSelection } from '@/store/mbprWizardSlice';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Heading from '../details/Heading';
import { TextUtils } from '@/utils/text';
import { Prisma } from '@prisma/client';
import stepActionableActions from '@/actions/production/stepActionables';
import { productionActions } from '@/actions/production';
import { staticRecords } from '@/configs/staticRecords';

type Inputs = {
    actionableTypeId: string;
    required: boolean;
    verificationRequired: boolean;
    secondaryVerificationRequired: boolean;
}

const ActionableForm = () => {

    const { selectedStep, isNewForFormPanel, actionableTypes, selectedActionable } = useMbprWizardSelection()
    const { addActionable, updateActionable } = useMbprWizardActions()

    const typeOptions = actionableTypes.map((t) => ({ value: t.id, label: TextUtils.properCase(t.name) }))

    const form = useForm<Inputs>();


    const handleSubmit = async (data: Inputs) => {

        if (!selectedStep) return;
        if (isNewForFormPanel) {

            const payload: Prisma.StepActionableUncheckedCreateInput = {
                stepId: selectedStep.id,
                actionableTypeId: data.actionableTypeId,
                required: data.required,
                verificationRequired: data.verificationRequired,
                secondaryVerificationRequired: data.secondaryVerificationRequired,
            }

            const response = await productionActions.mbprs.actionables.create(payload);

            addActionable(response);
        } else {

            if (!selectedActionable) return;
            const payload: Prisma.StepActionableUncheckedUpdateInput = {
                actionableTypeId: data.actionableTypeId,
                required: data.required,
                verificationRequired: data.verificationRequired,
                secondaryVerificationRequired: data.secondaryVerificationRequired,
            }

            const response = await productionActions.mbprs.actionables.update(selectedActionable.id, payload)

            updateActionable(selectedActionable.id, response);
        }
    }

    useEffect(() => {
        if (selectedActionable) {
            form.reset(selectedActionable);
        } else {
            form.reset({
                actionableTypeId: staticRecords.production.bprStepActionableTypes.completeStep,
                required: true,
                verificationRequired: false,
                secondaryVerificationRequired: false,

            })
        }
    }, [selectedActionable, form])

    return (
        <div className='flex flex-col gap-y-6'>

            <Form.Root onSubmit={handleSubmit} form={form}>
                <div className='flex flex-col'>
                    <Heading>Actions</Heading>
                    <div className='flex flex-col gap-y-1'>
                        <button type="submit" className='btn btn-success'>Save</button>
                    </div>
                </div>


                <Form.Select
                    form={form}
                    fieldName='actionableTypeId'
                    label='Action Type'
                    options={typeOptions}
                />

                <Form.Toggle
                    form={form}
                    fieldName='required'
                    label='Required'
                />

                <Form.Toggle
                    form={form}
                    fieldName='verificationRequired'
                    label='Verification Required'
                />

                <Form.Toggle
                    form={form}
                    fieldName='secondaryVerificationRequired'
                    label='Secondary Verification Required'
                />


            </Form.Root>
        </div>
    )
}

export default ActionableForm

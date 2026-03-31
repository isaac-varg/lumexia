import Form from "@/components/Form";
import { useMbprWizardActions, useMbprWizardSelection } from "@/store/mbprWizardSlice";
import { useForm } from "react-hook-form";
import Heading from "../details/Heading";
import Text from "@/components/Text";
import { TextUtils } from "@/utils/text";
import { productionActions } from "@/actions/production";
import { Prisma } from "@prisma/client";
import { recordStatuses } from "@/configs/staticRecords/recordStatuses";
import { createActivityLog } from "@/utils/auxiliary/createActivityLog";
import { useEffect } from "react";

type Input = {
    addendumTypeId: string;
    content: string;
}

const AddendumForm = () => {

    const { isNewForFormPanel, selectedStep, selectedAddendum, addendumTypes, selectedMbpr } = useMbprWizardSelection()
    const { updateAddendum, addAddendum, removeAddendum, setFormPanelMode } = useMbprWizardActions()

    const typesOptions = addendumTypes.map((type) => ({
        value: type.id,
        label: TextUtils.properCase(type.name),
    }));

    const form = useForm<Input>()


    const handleDelete = async () => {
        if (!selectedAddendum) return;
        await productionActions.mbprs.addendums.update(selectedAddendum.id, {
            recordStatusId: recordStatuses.archived,
        });
        if (selectedMbpr && selectedStep) await createActivityLog('Removed Addendum', 'mbpr', selectedMbpr.id, { context: `Removed addendum from step ${selectedStep.sequence}` })
        removeAddendum(selectedAddendum.id);
        setFormPanelMode('default');
    }

    const handleSubmit = async (data: Input) => {

        if (!selectedStep) return;

        if (isNewForFormPanel) {

            const payload: Prisma.StepAddendumUncheckedCreateInput = {
                stepId: selectedStep.id,
                addendumTypeId: data.addendumTypeId,
                content: data.content,
                recordStatusId: recordStatuses.active,
            }
            const response = await productionActions.mbprs.addendums.create(payload)

            if (selectedMbpr) await createActivityLog('Added Addendum', 'mbpr', selectedMbpr.id, { context: `Added ${response.addendumType.name} addendum to step ${selectedStep.sequence}` })
            addAddendum(response);
        } else {
            if (!selectedAddendum) return;
            const payload: Prisma.StepAddendumUncheckedUpdateInput = {
                addendumTypeId: data.addendumTypeId,
                content: data.content,
            }

            const response = await productionActions.mbprs.addendums.update(selectedAddendum.id, payload)

            if (selectedMbpr) await createActivityLog('Updated Addendum', 'mbpr', selectedMbpr.id, { context: `Updated addendum on step ${selectedStep.sequence}` })
            updateAddendum(selectedAddendum.id, response)
        }
    }

    useEffect(() => {
        if (selectedAddendum) {
            form.reset(selectedAddendum);
        } else {
            form.reset({ addendumTypeId: '', content: '' });
        }
    }, [selectedAddendum, form])
    return (

        <div className='flex flex-col gap-y-6'>

            <Form.Root onSubmit={handleSubmit} form={form}>
                <div className='flex flex-col'>
                    <Heading>Actions</Heading>
                    <div className='flex flex-col gap-y-1'>
                        <button type="submit" className='btn btn-success'>Save</button>
                        {!isNewForFormPanel && <button type="button" onClick={handleDelete} className='btn btn-error'>Delete</button>}
                    </div>
                </div>


                <Form.Select
                    form={form}
                    label="Addendum Type"
                    fieldName="addendumTypeId"
                    options={typesOptions}
                />

                <Form.TextArea
                    form={form}
                    fieldName="content"
                    label="Content"
                    required
                />
            </Form.Root>
        </div>
    )
}

export default AddendumForm

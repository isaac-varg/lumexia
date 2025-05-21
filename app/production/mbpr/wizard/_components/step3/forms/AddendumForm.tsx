import Form from "@/components/Form";
import { useMbprWizardActions, useMbprWizardSelection } from "@/store/mbprWizardSlice";
import { useForm } from "react-hook-form";
import Heading from "../details/Heading";
import Text from "@/components/Text";
import { TextUtils } from "@/utils/text";
import { productionActions } from "@/actions/production";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

type Input = {
    addendumTypeId: string;
    content: string;
}

const AddendumForm = () => {

    const { isNewForFormPanel, selectedStep, selectedAddendum, addendumTypes } = useMbprWizardSelection()
    const { updateAddendum, addAddendum } = useMbprWizardActions()

    const typesOptions = addendumTypes.map((type) => ({
        value: type.id,
        label: TextUtils.properCase(type.name),
    }));

    const form = useForm<Input>()


    const handleSubmit = async (data: Input) => {

        if (!selectedStep) return;

        if (isNewForFormPanel) {

            const payload: Prisma.StepAddendumUncheckedCreateInput = {
                stepId: selectedStep.id,
                addendumTypeId: data.addendumTypeId,
                content: data.content,
            }
            const response = await productionActions.mbprs.addendums.create(payload)

            addAddendum(response);
        } else {
            if (!selectedAddendum) return;
            const payload: Prisma.StepAddendumUncheckedUpdateInput = {
                addendumTypeId: data.addendumTypeId,
                content: data.content,
            }

            const response = await productionActions.mbprs.addendums.update(selectedAddendum.id, payload)

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

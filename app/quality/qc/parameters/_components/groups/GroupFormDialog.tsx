'use client'

import { qualityActions } from "@/actions/quality"
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll"
import Dialog from "@/components/Dialog"
import Form from "@/components/Form"
import useDialog from "@/hooks/useDialog"
import { useForm } from "react-hook-form"

type Inputs = {
    name: string
    abbreviation: string
    examinationTypeId: string
}

const GroupFormDialog = ({ examinationTypes }: { examinationTypes: ExaminationType[] }) => {

    const form = useForm()
    const { resetDialogContext } = useDialog()

    const handleSubmit = async (data: Inputs) => {

        await qualityActions.qc.groups.create(data);
        resetDialogContext()
        location.reload();


    }
    return (
        <Dialog.Root identifier="newQcGroup">

            <Dialog.Title>Add Group</Dialog.Title>


            <Form.Root form={form} onSubmit={handleSubmit}>

                <Form.Text form={form} fieldName="name" label="Name" required />
                <Form.Text form={form} fieldName="abbreviation" label="Abbreviation" required={true} />
                <Form.Select form={form} fieldName="examinationTypeId" label="Examinaton Type" options={examinationTypes.map(et => ({ label: et.name, value: et.id }))} />

                <Form.ActionRow form={form} />
            </Form.Root>

        </Dialog.Root>
    )
}

export default GroupFormDialog

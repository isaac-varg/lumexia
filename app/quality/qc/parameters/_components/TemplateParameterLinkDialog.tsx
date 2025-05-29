'use client'

import { qualityActions } from "@/actions/quality"
import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import Dialog from "@/components/Dialog"
import useDialog from "@/hooks/useDialog"
import { useRouter } from "next/navigation"


const TemplateCard = ({ template, selectedParameterId }: { template: QcTemplate, selectedParameterId: string }) => {

    const dialog = useDialog()
    const handleSubmit = async () => {
        await qualityActions.qc.templateParameters.create({ templateId: template.id, parameterId: selectedParameterId })
        dialog.resetDialogContext()
        location.reload()

    }

    return (
        <div onClick={() => handleSubmit()} className="flex flex-col gap-y-4 bg-lilac-100 hover:bg-lilac-200 hover:cursor-pointer p-8 rounded-xl">
            <h1 className="font-poppins text-xl font-semibold">{template.name}</h1>
            <p className="font-poppins text-lg">{template.description}</p>
        </div>
    )

}

const TemplateParameterLinkDialog = ({ templates, selectedParameter }: { templates: QcTemplate[], selectedParameter: QcParameter  | null}) => {

    if (!selectedParameter) return false

    return (
        <Dialog.Root identifier="templateParameterLink">
            <Dialog.Title>Add Parameter to Template</Dialog.Title>

            <div className="grid grid-cols-3 gap-4">
                {templates.map((t) => <TemplateCard key={t.id} template={t} selectedParameterId={selectedParameter.id} />)}
            </div>
        </Dialog.Root>
    )
}

export default TemplateParameterLinkDialog

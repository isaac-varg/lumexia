'use client'

import { qualityActions } from "@/actions/quality"
import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll"
import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import Dialog from "@/components/Dialog"
import Text from "@/components/Text"
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
        <div onClick={() => handleSubmit()} className="flex flex-col justify-center gap-y-4 bg-lilac-100 hover:bg-lilac-200 hover:cursor-pointer p-8 rounded-xl">
            <h1 className="font-poppins text-xl font-semibold">{template.name}</h1>
            {template.description.length !== 0 && <p className="font-poppins text-lg">{template.description}</p>}
        </div>
    )

}


const GroupCard = ({ group, selectedParameterId }: { group: QcParameterGroup, selectedParameterId: string }) => {

    const dialog = useDialog()
    const handleSubmit = async () => {
        await qualityActions.qc.groups.groupParameters.create({ groupId: group.id, parameterId: selectedParameterId })
        dialog.resetDialogContext()
        location.reload()

    }

    return (
        <div onClick={() => handleSubmit()} className="flex flex-col justify-center gap-y-4 bg-lilac-100 hover:bg-lilac-200 hover:cursor-pointer p-8 rounded-xl">
            <h1 className="font-poppins text-xl font-semibold">{`${group.name} (${group.abbreviation})`}</h1>
        </div>
    )

}

const TemplateParameterLinkDialog = ({ templates, selectedParameter, groups }: { templates: QcTemplate[], selectedParameter: QcParameter | null, groups: QcParameterGroup[] }) => {

    if (!selectedParameter) return false

    return (
        <Dialog.Root identifier="templateParameterLink">
            <Text.SectionTitle size="small">Add Parameter to Template</Text.SectionTitle>

            <div className="grid grid-cols-3 gap-4">
                {templates.map((t) => <TemplateCard key={t.id} template={t} selectedParameterId={selectedParameter.id} />)}
            </div>

            <Text.SectionTitle size="small">Add Parameter to Group</Text.SectionTitle>

            <div className="grid grid-cols-3 gap-4">
                {groups.map((g) => <GroupCard key={g.id} group={g} selectedParameterId={selectedParameter.id} />)}
            </div>



        </Dialog.Root>
    )
}

export default TemplateParameterLinkDialog

import { qualityActions } from "@/actions/quality"
import { QcTemplate, QcTemplateParameter } from "@/actions/quality/qc/templates/getAll"
import Dialog from "@/components/Dialog"
import Text from "@/components/Text"
import { useEffect, useState } from "react"
import { TbTrash } from "react-icons/tb"

const ModifyTemplateDialog = ({ template }: { template: QcTemplate | null }) => {

    const [parameters, setParameters] = useState<QcTemplateParameter[]>()

    const handleRemoval = (id: string) => {
        const filtered = parameters?.filter((p) => p.id !== id);
        setParameters(filtered);
    }


    useEffect(() => {
        if (!template) {
            console.log('fml')
            return;
        }

        setParameters(template.parameters)

    }, [template])

    if (!template) return false


    return (
        <Dialog.Root identifier="modifyTemplateDialog">

            <Dialog.Title>{template.name}</Dialog.Title>

            <Text.SectionTitle size="small">Parameters</Text.SectionTitle>

            <div className="grid grid-cols-4 gap-4">
                {(parameters && parameters?.length !== 0) && parameters.map((p) => <TemplateParameter name={p.parameter.name} id={p.id} onRemove={handleRemoval} />)}
            </div>


        </Dialog.Root>
    )
}


const TemplateParameter = ({ name, id, onRemove }: { name: string, id: string, onRemove: (id: string) => void }) => {

    const handleDelete = async () => {
        await qualityActions.qc.templateParameters.delete(id)
        onRemove(id);
    }
    return (
        <div className="flex flex-col gap-y-4 justify-center p-8 bg-lilac-100 rounded-xl">

            <div className="flex justify-between items-center">
                <h1 className="font-poppins text-xl font-semibold">
                    {name}
                </h1>

                <button onClick={() => handleDelete()} className="btn btn-circle"><TbTrash /></button>
            </div>
        </div>
    )
}

export default ModifyTemplateDialog

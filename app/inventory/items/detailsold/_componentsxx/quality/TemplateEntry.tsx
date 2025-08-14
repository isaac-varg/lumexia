import { qualityActions } from "@/actions/quality";
import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice";
import { useEffect, useState } from "react"
import { inflateTemplateParameters } from "../../_functions/quality/inflateTemplateParameters";

const TemplateEntry = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [templates, setTemplates] = useState<QcTemplate[]>([])
    const { item } = useItemDashboardSelection()
    const { setItemParametersPanelMode, getQcItemParameters } = useItemDashboardActions()


    const handleTemplateClick = async (templateId: string) => {

        if (!item) {
            throw new Error('Cannot infate template parameters without item id')
        }

        await inflateTemplateParameters(item.id, templateId);
        getQcItemParameters()
        setItemParametersPanelMode('view')


    }

    useEffect(() => {

        const getTemplates = async () => {
            try {
                const t = await qualityActions.qc.templates.getAll();
                setTemplates(t)
            } catch (error) {
                console.error(error)
                throw new Error('Could not fetch templates');
            } finally {
                setIsLoading(false)
            }
        }

        if (isLoading && templates.length === 0) {
            getTemplates()
        }
    }, [isLoading])

    return (
        <div className="grid grid-cols-4 gap-4">
            {templates.map((t) => {
                return (
                    <div key={t.id} onClick={() => handleTemplateClick(t.id)} className="bg-lilac-100 hover:bg-lilac-200 hover:cursor-pointer p-6 rounded-xl flex flex-col">
                        <h1 className="font-poppins text-xl font-semibold">{t.name}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default TemplateEntry

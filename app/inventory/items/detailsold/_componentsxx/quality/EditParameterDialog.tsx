import Dialog from "@/components/Dialog"
import { JsonEditor } from 'json-edit-react'
import Text from "@/components/Text";
import { useItemDashboardActions, useItemDashboardSelection } from "@/store/itemDashboardSlice"
import { useEffect, useState } from "react";
import { qualityActions } from "@/actions/quality";
import useDialog from "@/hooks/useDialog";

const EditParameterDialog = () => {
    const { selectedItemParameter } = useItemDashboardSelection();
    const { setSelectedQcItemParameter, getQcItemParameters } = useItemDashboardActions()
    const { resetDialogContext } = useDialog()
    const [inputDef, setInputDef] = useState<any>()


    const handleSave = async () => {
        if (!selectedItemParameter || !inputDef) return;


        await qualityActions.qc.itemParameters.update(selectedItemParameter.id, {
            specification: inputDef
        });

        getQcItemParameters()
        setSelectedQcItemParameter(null)
        resetDialogContext()

    };


    useEffect(() => {
        if (!selectedItemParameter) return;


        const generic = {
            fields: [
                {
                    name: "temperature",
                    label: "Temperature",
                    type: "number",
                    required: false,
                    unit: "°C"
                },
            ]
        }

        if (selectedItemParameter.specification) {
            setInputDef(selectedItemParameter.specification);
            return;
        }

        setInputDef(generic)

    }, [selectedItemParameter]);


    return (
        <Dialog.Root identifier={`editQcItemParameter`}>
            <Dialog.Title >Edit Parameter</Dialog.Title>

            <div className='flex flex-col gap-y-6'>
                <div>
                    <Text.SectionTitle size="small">Calculated Specification</Text.SectionTitle>
                    <p>Not yet implemented</p>

                </div>

                <div className="flex flex-col gap-y-4">
                    <Text.SectionTitle size="small">Set Specification</Text.SectionTitle>

                    <JsonEditor
                        data={inputDef}
                        setData={(data: any) => setInputDef(data)}

                    />

                    <div className="flex">
                        <button className="btn  btn-success" onClick={() => handleSave()}>Save</button>
                    </div>
                </div>
            </div>




        </Dialog.Root>
    )
}

export default EditParameterDialog

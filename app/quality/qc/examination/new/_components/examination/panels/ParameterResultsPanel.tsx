import Form from "@/components/Form"
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { IntermediateParameterResult, useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { JsonEditor } from 'json-edit-react'


type ParameterInputDefinition = {
    fields: Array<{
        name: string;
        type: "text" | "number" | "select";
        label: string;
        unit?: string;
        required: boolean;
        options?: Array<{ label: string; value: string }>;
    }>;
};

const ParameterResultsPanel = () => {
    const { selectedItemParameter } = useQcExaminationSelection()
    const { setParameterResult, getParameterResult, hasParameterResult } = useQcExaminationActions()
    const form = useForm();
    console.log(selectedItemParameter)


    const inputDefinition = selectedItemParameter?.parameter?.inputDefinition as ParameterInputDefinition | undefined;

    const handleSubmit = async (data: any) => {

        if (!selectedItemParameter) return;

        const result: IntermediateParameterResult = {
            parameterId: selectedItemParameter.parameterId,
            note: data.note || '',
            ...data
        }


        setParameterResult(selectedItemParameter.parameterId, result)
    }

    useEffect(() => {
        if (!selectedItemParameter) return;

        const hasResults = hasParameterResult(selectedItemParameter.parameterId)

        if (hasResults) {
            form.reset({ ...getParameterResult(selectedItemParameter.parameterId) })
        } else {
            form.reset();
        }


    }, [selectedItemParameter, getParameterResult, hasParameterResult, form])

    if (!selectedItemParameter) {
        return (
            <Panels.Root>
                <Text.SectionTitle size="small">Parameter Results</Text.SectionTitle>
                <h1 className="font-poppins text-xl font-semibold">Please select a parameter</h1>
            </Panels.Root>
        )
    }

    return (
        <Panels.Root>


            {!selectedItemParameter && <h1 className="font-poppins text-xl font-semibold">Please select a parameter</h1>}

            <Text.SectionTitle size="small">Specification</Text.SectionTitle>

            <JsonEditor
                data={selectedItemParameter.parameter.qcItemParameters[0].specification}
            />


            <Text.SectionTitle size="small">Parameter Results</Text.SectionTitle>



            <Form.Root form={form} onSubmit={handleSubmit}>

                <Form.Text form={form} label={`Result (${selectedItemParameter?.parameter.uom})`} fieldName="result" required />

                {inputDefinition?.fields?.map((field) => {
                    const label = field.unit ? `${field.label} (${field.unit})` : field.label;

                    switch (field.type) {
                        case "number":
                            return (
                                <Form.Text
                                    key={field.name}
                                    form={form}
                                    fieldName={field.name}
                                    label={label}
                                    required={field.required}
                                />
                            );

                        case "text":
                            return (
                                <Form.Text
                                    key={field.name}
                                    form={form}
                                    fieldName={field.name}
                                    label={label}
                                    required={field.required}
                                />
                            );

                        case "select":
                            return (
                                <Form.Select
                                    key={field.name}
                                    form={form}
                                    fieldName={field.name}
                                    label={label}
                                    options={field.options || []}
                                />
                            );

                        default:
                            return null;
                    }
                })}

                <div className="flex justify-end items-center">

                    <button type="submit" className="btn btn-success">Save</button>
                </div>

            </Form.Root>





        </Panels.Root>
    )
}

export default ParameterResultsPanel

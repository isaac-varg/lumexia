import Form from "@/components/Form"
import { useForm } from "react-hook-form"
import { JsonEditor } from 'json-edit-react'
import { useState } from "react"
import { Prisma } from "@prisma/client"
import { qualityActions } from "@/actions/quality"
import { useRouter } from "next/navigation"
import Card from "@/components/Card"


type Inputs = {
    name: string
    uom: string
    isWetParameter: boolean
    dataType: 'string' | 'boolean' | 'float' | 'integer'
    description?: string
}

const ManualEntry = () => {

    const form = useForm<Inputs>({ defaultValues: { name: '', uom: '', isWetParameter: false, dataType: 'string', description: '' } })
    const router = useRouter()
    const [inputDef, setInputDef] = useState({
        fields: [
            {
                name: "temperature",
                label: "Temperature",
                type: "number",
                required: false,
                unit: "°C"
            },
        ]
    })

    const fieldTypeOptions = [
        { label: 'String', value: 'string' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Float', value: 'float' },
        { label: 'Integer', value: 'integer' },
    ]

    const handleSubmit = async (data: Inputs) => {

        const payload: Prisma.QcParameterUncheckedCreateInput = {
            ...data,
            inputDefinition: inputDef,
        }

        await qualityActions.qc.parameters.create(payload)
        router.back()




    }

    return (
        <Card.Root>

            <Card.Title>New Parameter</Card.Title>

            <Form.Root form={form} onSubmit={handleSubmit} >

                <Form.Text form={form} fieldName="name" label="Name" required />

                <Form.Text form={form} fieldName="description" label="Description" required={false} />

                <Form.Text form={form} fieldName="uom" label="Unit of Measurement" required />

                <Form.Select form={form} fieldName="dataType" label="Data Type" options={fieldTypeOptions} />

                <Form.Toggle form={form} fieldName="isWetParameter" label="Is Wet Parameter" />

                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-poppins text-neutral-950 text-xl">
                        Input Definition
                    </label>

                    <JsonEditor
                        data={inputDef}
                        setData={(data: any) => setInputDef(data)}

                    />

                </div>


                <Form.ActionRow form={form} />


            </Form.Root>

        </Card.Root>

    )
}

export default ManualEntry

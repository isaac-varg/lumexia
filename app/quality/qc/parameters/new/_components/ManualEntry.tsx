'use client'
import Form from "@/components/Form"
import { useForm } from "react-hook-form"
import { Prisma } from "@prisma/client"
import { qualityActions } from "@/actions/quality"
import { useRouter } from "next/navigation"
import Card from "@/components/Card"
import { QcDataType } from "@/actions/quality/qc/dataTypes/getAll"


type Inputs = {
  name: string
  uom: string
  isWetParameter: boolean
  dataTypeId: string
  description?: string
}

const ManualEntry = ({ dataTypes }: { dataTypes: QcDataType[] }) => {

  const form = useForm<Inputs>({ defaultValues: { name: '', uom: '', isWetParameter: false, dataTypeId: '', description: '' } })
  const router = useRouter()



  const handleSubmit = async (data: Inputs) => {

    const payload: Prisma.QcParameterUncheckedCreateInput = {
      ...data,
    }
    await qualityActions.qc.parameters.create(payload)
    router.back()
  }

  return (
    <Card.Root>

      <Form.Root form={form} onSubmit={handleSubmit} >

        <Form.Text form={form} fieldName="name" label="Name" required />

        <Form.Text form={form} fieldName="description" label="Description" required={false} />

        <Form.Text form={form} fieldName="uom" label="Unit of Measurement" required />

        <Form.Select form={form} fieldName="dataTypeId" label="Data Type" options={dataTypes.map(t => ({ label: t.name, value: t.id }))} />

        <Form.Toggle form={form} fieldName="isWetParameter" label="Is Wet Parameter" />

        <Form.ActionRow form={form} />

      </Form.Root>

    </Card.Root>

  )
}

export default ManualEntry

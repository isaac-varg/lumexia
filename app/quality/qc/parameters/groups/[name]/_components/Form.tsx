'use client'

import { qualityActions } from "@/actions/quality"
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll"
import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll"
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { useRouter } from "next/navigation"

const Form = ({ group, examinationTypes }: { group: QcParameterGroup, examinationTypes: ExaminationType[] }) => {

  const { name, abbreviation, examinationTypeId } = group
  const router = useRouter()

  const form = useAppForm({
    defaultValues: {
      name,
      abbreviation,
      examinationTypeId,
    },
    onSubmit: async ({ value }) => {
      if (!group) {
        throw new Error("Cannot update without selected group");
      };

      await qualityActions.qc.groups.update(group.id, value);
      form.reset()
      router.refresh()
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Group Details</SectionTitle>

      <Card.Root>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >

          <form.AppField
            name="name"
          >
            {(field) => <field.TextField label="Name" />}
          </form.AppField>

          <form.AppField
            name="abbreviation"
          >
            {(field) => <field.TextField label="Abbreviation" />}
          </form.AppField>

          <form.AppField
            name="examinationTypeId"
          >
            {(field) => <field.SelectField label="Examination Type" options={examinationTypes.map(et => ({ value: et.id, label: et.name }))} />}
          </form.AppField>

          <div>
            <form.AppForm>
              <form.SubmitButton />
            </form.AppForm>
          </div>
        </form>
      </Card.Root>
    </div>
  )
}

export default Form

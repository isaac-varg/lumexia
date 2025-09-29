'use client'

import { QcTemplate } from "@/actions/quality/qc/templates/getAll"
import Card from "@/components/Card"
import { useAppForm, useFormContext } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { useRouter } from "next/navigation"

const Form = ({ template }: { template: QcTemplate }) => {

  const { name, description } = template
  const router = useRouter()

  const form = useAppForm({
    defaultValues: {
      name,
      description,
    },
    onSubmit: async ({ value }) => {
      if (!template) {
        throw new Error("Cannot update without selected template");
      };
      form.reset()
      router.refresh()
    }
  })

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>Template Details</SectionTitle>

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
            children={(field) => <field.TextField label="Name" />}
          />

          <form.AppField
            name="description"
            children={(field) => <field.TextField label="Description" />}
          />
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

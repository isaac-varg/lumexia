'use client'
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { UserConfig } from "../_actions/getAllConfigs"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { updateUserConfig } from "@/actions/users/updateUserConfig"
import { userConfigGroups } from "@/configs/staticRecords/userConfigGroups"

const AppConfigurations = ({ configs }: { configs: UserConfig[] }) => {

  const router = useRouter()
  const userConfigs = useMemo(() => {
    return new Map(configs.map(c => ([c.name, c.value])))
  }, [configs])
  const defaultValues = useMemo(() => ({
    language: userConfigs.has('language') ? userConfigs.get('language') : 'en',
  }), [userConfigs])


  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await Promise.all(
        (Object.keys(value) as Array<keyof typeof value>).map(async (config) => {
          const configValue = value[config]
          if (configValue) {
            return await updateUserConfig(config, configValue, userConfigGroups.general)
          }
        }
        )
      )
      form.reset()
      router.refresh()
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>App</SectionTitle>

      <Card.Root>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >

          <form.AppField
            name="language"
          >
            {(field) => <field.SelectField label="Language" options={[{ value: 'en', label: 'English' }, { value: 'es', label: 'Español' }]} />}
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

export default AppConfigurations

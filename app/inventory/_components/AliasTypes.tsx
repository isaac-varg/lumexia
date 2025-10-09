'use client'
import Card from "@/components/Card"
import { useAppForm } from "@/components/Form2"
import SectionTitle from "@/components/Text/SectionTitle"
import { AliasType } from "@prisma/client"
import { aliasTypes as staticAliasType } from "@/configs/staticRecords/aliasTypes"
import aliasTypeActions from "@/actions/inventory/aliasTypes"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { TbPlus } from "react-icons/tb"
import AliasTypeForm from "./AliasTypeForm"

const AliasTypes = ({ aliasTypes }: { aliasTypes: AliasType[] }) => {

  const router = useRouter();
  const [isAdd, setIsAdd] = useState(false);
  const form = useAppForm({
    defaultValues: {
      aliasTypes,
    },
    onSubmit: async ({ value }) => {

      await Promise.all(value.aliasTypes.map(async (at) => {
        if (at.id === staticAliasType.supplier) return;
        return await aliasTypeActions.update({ id: at.id }, { name: at.name });
      }));

      router.refresh()
      form.reset()
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <SectionTitle>Alias Types</SectionTitle>

        <button onClick={() => setIsAdd(true)} className="btn btn-secondary"><TbPlus className="size-4" /> </button>

      </div>


      <Card.Root>
        <p className="font-poppins text-xl text-base-content">The types of alternate names an item can have. Supplier Alias type is required and therefore not shown.</p>

        {isAdd && <AliasTypeForm setIsAdd={setIsAdd} />}
        {!isAdd && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-4"
          >

            <form.AppField name="aliasTypes" mode="array">
              {(field) => {
                return (
                  <div className="flex flex-col gap-4">
                    {field.state.value.map((_, i) => {
                      if (_.id === staticAliasType.supplier) return false;
                      return (
                        <form.AppField
                          key={`aliasTypes[${i}].id`}
                          name={`aliasTypes[${i}].name`} >
                          {(subField) => <subField.TextField label={_.name} />}
                        </form.AppField>

                      )
                    })}
                  </div>
                )
              }}

            </form.AppField>


            <div>
              <form.AppForm>
                <form.SubmitButton />
              </form.AppForm>
            </div>

          </form>
        )}
      </Card.Root>

    </div>

  )
}

export default AliasTypes

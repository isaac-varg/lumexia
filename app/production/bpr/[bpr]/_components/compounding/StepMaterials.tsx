import Card from "@/components/Card"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"
import SectionTitle from "@/components/Text/SectionTitle"

const StepMaterials = () => {

  const { selectedStep } = useProductionSelection()
  const { t } = useTranslation()

  if (!selectedStep) {
    return null
  }


  return (
    <Card.Root>

      <Card.Title>{t(translations, 'compoundingMaterialsTitle')}</Card.Title>

      <div className="grid grid-cols-2 gap-4">

        {selectedStep?.batchStep.BillOfMaterial.map(i => {
          return (
            <div key={i.id}
              className="bg-primary/35 rounded-xl p-4 shadow-sm items-center justify-center flex flex-col gap-y-2">
              <div className="font-poppins font-semibold text-xl text-base-content">{i.identifier}</div>
              <div className="font-poppins font-medium text-xl text-base-content">{i.item.name}</div>
            </div>
          )
        })}

      </div>


    </Card.Root>

  )
}

export default StepMaterials

import SectionTitle from "@/components/Text/SectionTitle"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"
import MaterialButton from "./MaterialButton"
import Card from "@/components/Card"

const MaterialList = () => {

  const { bom } = useProductionSelection()
  const sorted = bom.sort((a, b) => parseInt(a.bom.identifier) - parseInt(b.bom.identifier));
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6 col-span-2">

      <SectionTitle>{t(translations, 'bomItmeListTitle')}</SectionTitle>

      <Card.Root>
        <div className="grid grid-cols-1 gap-4">

          {sorted.map(item => <MaterialButton key={item.id} material={item} />)}
        </div>
      </Card.Root>

    </div>
  )
}

export default MaterialList

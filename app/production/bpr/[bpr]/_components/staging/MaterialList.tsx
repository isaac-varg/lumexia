import SectionTitle from "@/components/Text/SectionTitle"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"
import MaterialButton from "../shared/MaterialButton"
import Card from "@/components/Card"
import { bprStagingStatuses } from "@/configs/staticRecords/bprStagingStatuses"

const MaterialList = () => {

  const { bom } = useProductionSelection()
  const sorted = bom.sort((a, b) => parseInt(a.bom.identifier) - parseInt(b.bom.identifier));
  const filtered = bom.filter(item => item.statusId === bprStagingStatuses.notStarted)
  const stagedFiltered = sorted.filter(item => item.statusId !== bprStagingStatuses.notStarted);
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6 col-span-2">

      <SectionTitle>{t(translations, 'bomItmeListTitle')}</SectionTitle>

      <Card.Root>


        <div className="flex flex-col gap-6">
          <SectionTitle size="small">{t(translations, "bomItemList")}</SectionTitle>

          {filtered.length === 0 && <p className={"text-base-content text-lg text-medium"}>{t(translations, 'noMaterialsToStage')}</p>}

          <div className="grid grid-cols-1 gap-4">
            {filtered.map(item => <MaterialButton key={item.id} material={item} />)}

          </div>

          <SectionTitle size="small">{t(translations, "bomItemListStaged")}</SectionTitle>
          <div className="grid grid-cols-1 gap-4">
            {stagedFiltered.map(item => <MaterialButton key={item.id} material={item} />)}
          </div>

        </div>

      </Card.Root>

    </div>
  )
}

export default MaterialList

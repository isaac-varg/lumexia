import Card from "@/components/Card"
import { useTranslation } from "@/hooks/useTranslation"
import { translations } from "../../_configs/translations"
import { ProductionStep } from "../../_actions/compounding/getSteps"
import { useProductionSelection } from "@/store/productionSlice"
import { stepAddendumTypes } from "@/configs/staticRecords/stepAddendumTypes"

const { warning, info } = stepAddendumTypes;

const classes = {
  bg: {
    warning: 'bg-warning/30 text-warning-content',
    info: 'bg-info/30 text-info-content',
  },
  badge: {
    warning: 'badge-warning',
    info: 'badge-info',
  }
}

const Addendums = () => {
  const { t } = useTranslation()
  const { selectedStep } = useProductionSelection()

  return (
    <Card.Root>

      <Card.Title>{t(translations, 'addendaTitle')}</Card.Title>

      <div className="grid grid-col-1 gap-4">
        {selectedStep?.batchStep.StepAddendum.map(addendum => <AddendaCard key={addendum.id} addendum={addendum} />)}
      </div>

    </Card.Root>
  )
}

const AddendaCard = ({ addendum }: { addendum: ProductionStep['batchStep']['StepAddendum'][number] }) => {

  let type;

  switch (addendum.addendumTypeId) {
    case warning:
      type = 'warning'
      break;
    case info:
      type = 'info'
      break;
    default:
      type = 'info'
      break;
  }


  return (
    <div className={`${classes.bg[type as keyof typeof classes.bg]} py-4 px-4 rounded-xl flex gap-4 text-lg items-center`}>

      <div className={`badge ${classes.badge[type as keyof typeof classes.badge]} uppercase badge-lg font-semibold`}>
        {addendum.addendumType.name}
      </div>
      <div >

        {addendum.content}
      </div>
    </div>
  )

}


export default Addendums

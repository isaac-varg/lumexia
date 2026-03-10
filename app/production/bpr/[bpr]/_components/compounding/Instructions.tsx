import Card from "@/components/Card"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionSelection } from "@/store/productionSlice"
import { recordStatuses } from "@/configs/staticRecords/recordStatuses"
import { translations } from "../../_configs/translations"

const Instructions = () => {

  const { selectedStep } = useProductionSelection()
  const { t } = useTranslation()

  const instructions = selectedStep?.batchStep.StepInstruction.filter(
    i => i.recordStatusId !== recordStatuses.archived
  ) ?? []

  return (
    <Card.Root>

      <Card.Title>{t(translations, 'instructionsTitle')}</Card.Title>

      <ul className="list-disc ml-6">
        {instructions.map(i => {
          return (
            <li key={i.id} className=" text-lg ">
              {i.instructionContent}
            </li>
          )
        })}
      </ul>

    </Card.Root>
  )
}

export default Instructions

import Card from "@/components/Card"
import { useTranslation } from "@/hooks/useTranslation"
import { useProductionSelection } from "@/store/productionSlice"
import { translations } from "../../_configs/translations"

const Instructions = () => {

  const { selectedStep } = useProductionSelection()
  const { t } = useTranslation()

  return (
    <Card.Root>

      <Card.Title>{t(translations, 'instructionsTitle')}</Card.Title>

      <ul className="list-disc ml-6">
        {selectedStep?.batchStep.StepInstruction.map(i => {
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

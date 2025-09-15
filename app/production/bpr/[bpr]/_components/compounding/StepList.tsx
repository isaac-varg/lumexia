import { useProductionSelection } from "@/store/productionSlice"
import { groupByProperty } from "@/utils/data/groupByProperty";
import { useEffect, useState } from "react"
import { ProductionStep } from "../../_actions/compounding/getSteps";
import SectionTitle from "@/components/Text/SectionTitle";
import { useTranslation } from "@/hooks/useTranslation";
import { translations } from "../../_configs/translations";
import Card from "@/components/Card";
import { keyframes } from "framer-motion";
import StepButton from "./StepButton";

const StepList = () => {

  const { steps } = useProductionSelection()
  const [stepsGrouped, setStepsGrouped] = useState<Record<string, ProductionStep[]>>({});
  const { t } = useTranslation()




  useEffect(() => {
    const grouped = groupByProperty(steps, 'batchStep.phase');
    setStepsGrouped(grouped)
  }, [steps])



  return (
    <div className="flex flex-col gap-6 col-span-2">

      <SectionTitle>{t(translations, 'stepsTitle')}</SectionTitle>

      <Card.Root>


        <div className="flex flex-col gap-6">

          {Object.keys(stepsGrouped).map(phase => {
            return (
              <div key={phase}>

                <SectionTitle size="small">{`${t(translations, "stepPhase")} ${phase}`}</SectionTitle>

                <div className="grid grid-cols-1 gap-2">
                  {stepsGrouped[phase].map(step => <StepButton key={step.id} step={step} />)}

                </div>

              </div>
            )
          })}


        </div>

      </Card.Root>

    </div>
  )
}

export default StepList

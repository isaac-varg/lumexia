"use client"

import { useCallback, useEffect, useState } from "react"
import ItemStep from "./ItemStep"
import ActiveRequestsStep from "./ActiveRequestsStep"
import StepLabel from "./StepLabel"
import NotesStep from "./NotesStep"
import Card from "@/components/Card"
import CompleteStep from "./CompleteStep"
import { PurchasedItem } from "@/actions/inventory/getPurchasedItems"

type MainPanelProps = {
  items: PurchasedItem[],
  incomingItemId: string
}

export type InterimNote = {
  noteTypeId: string,
  content: string
}

export type InterimSnapshotWarnings = {
  warningShown: boolean, warningOverridden: boolean
}


const MainPanel = ({ items, incomingItemId }: MainPanelProps) => {

  const [step, setStep] = useState(0);
  const [item, setItem] = useState('');
  const [snapshotWarnings, setSnapshotWarnings] = useState({ warningShown: false, warningOverridden: false });
  const [notes, setNotes] = useState<InterimNote[]>([])


  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);


  useEffect(() => {
    if (incomingItemId) {
      setItem(incomingItemId);
      setStep(1)
    }

  }, [incomingItemId])




  return (
    <div>

      <ul className="steps w-full ">
        <StepLabel indicator="1" step={0} currentStep={step} label="Select Item" />
        <StepLabel indicator="2" step={1} currentStep={step} label="Existing Requests Validation" />
        <StepLabel indicator="3" step={2} currentStep={step} label="Notes" />
        <StepLabel indicator="4" step={3} currentStep={step} label="Complete" />
      </ul>

      <Card.Root>
        <ItemStep items={items} nextStep={nextStep} setItem={setItem} currentStep={step} />

        <ActiveRequestsStep nextStep={nextStep} itemId={item} setSnapshotWarnings={setSnapshotWarnings} currentStep={step} />

        <NotesStep nextStep={nextStep} currentStep={step} setNotes={setNotes} notes={notes} />

        <CompleteStep
          currentStep={step}
          item={item}
          snapshotWarnings={snapshotWarnings}
          notes={notes}
        />
      </Card.Root>



    </div>

  )
}

export default MainPanel

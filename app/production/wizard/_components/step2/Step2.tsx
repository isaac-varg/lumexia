"use client"

import { useEffect, useState } from "react"
import { getMbprs } from "../../_functions/getMbprs"
import useProductionWizard from "@/hooks/useProductionWizard";
import Card from "@/components/Card";


const Step2 = () => {
  const [mbprs, setMbprs] = useState([]);
  const { selectedProducibleMaterial } = useProductionWizard()

  useEffect(() => {

    const getData = async () => {
      if (!selectedProducibleMaterial) { return }
      const mbprs = await getMbprs(selectedProducibleMaterial?.id);

      setMbprs(mbprs);
    }

    getData()
  }, [selectedProducibleMaterial])

  return (
    <Card.Root>
      <Card.Title>Master Batch Production Records</Card.Title>

      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-y-2 bg-blue-300 p-2 rounded-lg shadow-xl shadow-blue-500">
          <span>Label</span>
          <span>Status</span>
          <span>dd tt</span>
        </div>
      </div>
    </Card.Root>
  )
}

export default Step2

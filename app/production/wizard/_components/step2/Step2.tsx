"use client"

import { useEffect, useState } from "react"
import { getMbprs } from "../../_functions/getMbprs"
import useProductionWizard from "@/hooks/useProductionWizard";


const Step2 = () => {
  const [mbprs, setMbprs] = useState([]);
  const {  selectedProducibleMaterial } = useProductionWizard()

  useEffect(() => {

    const getData = async () => {
        if (!selectedProducibleMaterial) { return }
      const mbprs = await getMbprs(selectedProducibleMaterial?.id);

      setMbprs(mbprs);
    }

    getData()
  }, [selectedProducibleMaterial])
  console.log(mbprs)

  return (
    <div>Step2</div>
  )
}

export default Step2

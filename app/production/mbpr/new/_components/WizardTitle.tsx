"use client"

import PageTitle from "@/components/Text/PageTitle"
import { ProductionWizardContext } from "@/context/ProductionWizardContext"
import { useContext } from "react"

const WizardTitle = () => {
  const { selectedProducibleMaterial, selectedMbpr } = useContext(ProductionWizardContext)

  return (
    <PageTitle>{selectedProducibleMaterial ? `Wizard - ${selectedProducibleMaterial.name} ${selectedMbpr ? `[${selectedMbpr.versionLabel}]`: ''}` : 'Wizard - Select Item...'}</PageTitle>
  )
}

export default WizardTitle

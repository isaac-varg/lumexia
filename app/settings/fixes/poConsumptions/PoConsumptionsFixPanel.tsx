'use client'
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { useState } from "react";
import { createMissingStagingConsumptionLink } from "./createMissingStagingConsumptionLink";

const PoConsumptionsFixPanel = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFix = async () => {

    try {
      setIsLoading(true);
      createMissingStagingConsumptionLink();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <Panels.Root>
      <Text.SectionTitle size="small">Create BPR Consumption Transaction Links</Text.SectionTitle>
      <Text.Normal>This will create a link between each BPR Staging entry and it&apos;s corresponding transaction for BPRs that were produced before the link functionality.</Text.Normal>



      {isLoading && (
        <button className="btn btn-neutral btn-soft">
          <span className="loading loading-spinner"></span>
          loading
        </button>
      )}

      {!isLoading && (
        <button className="btn btn-neutral btn-soft" onClick={() => handleFix()}>Fix POs</button>
      )}
    </Panels.Root>

  )
}

export default PoConsumptionsFixPanel

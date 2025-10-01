'use client'
import { Panels } from "@/components/Panels"
import Text from "@/components/Text"
import { qcRecordStatuses } from "@/configs/staticRecords/qcRecordStatuses"
import { usePlanningDashboardSelection } from "@/store/planningDashboardSlice"
import { DateTime } from "luxon"
import { TbCheck, TbX } from "react-icons/tb"

const RequirementsPanel = () => {

  const now = DateTime.now();
  const twoWeeksAgo = now.minus({ days: 14 });
  const longAgo = now.minus({ days: 365 });
  const { bom, qcGroups, qcExaminations, lastItemPrice } = usePlanningDashboardSelection()
  const isStaged = bom.every(b => b.status.sequence > 1);
  const isVerified = bom.every(b => b.status.sequence > 2);
  const isSecondarilyVerified = bom.every(b => b.status.sequence > 3);
  const isQcConducted = qcGroups.length <= qcExaminations.length;
  const isQcPassed = qcExaminations.every(e => e.statusId === qcRecordStatuses.pass)
  const lastPriceCreatedAt = lastItemPrice ? DateTime.fromJSDate(lastItemPrice.createdAt) : longAgo
  const isPricingConductedRecently = lastPriceCreatedAt >= twoWeeksAgo && lastPriceCreatedAt <= now


  return (
    <Panels.Root>
      <Text.SectionTitle size="small">Requirements</Text.SectionTitle>


      <RequirementsLine label="BOM Staging" isComplete={isStaged} />
      <RequirementsLine label="BOM Primary Verification" isComplete={isVerified} />
      <RequirementsLine label="BOM Secondary Verification" isComplete={isSecondarilyVerified} />
      <RequirementsLine label="QC Conducted" isComplete={isQcConducted} />
      <RequirementsLine label="QC Passed" isComplete={isQcPassed} />
      <RequirementsLine label="Pricing" isComplete={isPricingConductedRecently} />


    </Panels.Root>
  )
}

const RequirementsLine = ({ label, isComplete }: { label: string, isComplete: boolean }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="font-poppins text-lg font-medium">{label}</p>

      <span className="text-2xl">
        {isComplete ? <span className="text-green-400"><TbCheck /></span> : <span className="text-red-500"><TbX /></span>}
      </span>
    </div>
  )
}


export default RequirementsPanel

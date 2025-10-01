'use client'

import { useRouter } from "next/navigation"
import ScanListener from "./ScanListener"
import { useState } from "react"
import { getLot } from "@/app/production/compounding/[id]/_functions/getLot"
import { inventoryActions } from "@/actions/inventory"
import { useQcExaminationActions } from "@/store/qcExaminationSlice"
import { qualityActions } from "@/actions/quality"
import { getUserId } from "@/actions/users/getUserId"
import { qcExaminationTypes } from "@/configs/staticRecords/qcExaminationTypes"
import { qcRecordStatuses } from "@/configs/staticRecords/qcRecordStatuses"

const ScanPanel = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { nextStep } = useQcExaminationActions()

  const handleItemSelection = async (lotId: string) => {

    try {
      setIsLoading(true);
      const lot = await inventoryActions.lots.getOne(lotId);
      if (!lot) {
        return;
      }
      const userId = await getUserId()
      const record = await qualityActions.qc.records.create({
        conductedById: userId,
        examinedLotId: lot.id,
        examinationTypeId: qcExaminationTypes.inProcess,
        statusId: qcRecordStatuses.open,
      })

      const path = `/quality/qc/examination/new/${lot.lotNumber}?lotId=${lot.id}&examinationId=${record.id}`
      nextStep()
      router.push(path)
    } catch (error) {
      console.error(error);
    } finally { setIsLoading(false) }
  }


  return (
    <div className="flex items-center justify-center">
      {isLoading && <div className="min-h-60 skeleton w-40" />}
      {!isLoading && <ScanListener handleItemSelection={(lot) => handleItemSelection(lot)} />}


    </div>

  )
}

export default ScanPanel

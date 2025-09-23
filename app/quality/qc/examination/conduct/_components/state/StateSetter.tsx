'use client'
import { Lot } from "@/actions/inventory/lots/getAll";
import { useQcExaminationActions } from "@/store/qcExaminationSlice";
import { useEffect } from "react";

type Props = {
  lotId?: string
  lots: Lot[],
}

const StateSetter = ({
  lotId,
  lots,
}: Props) => {

  const { setLots, nextStep } = useQcExaminationActions()


  useEffect(() => {
    if (lotId) {

    }
  })

  useEffect(() => {
    setLots(lots);
  }, [
    lots,
    setLots,
  ])

  return false;
}

export default StateSetter

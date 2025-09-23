'use client'
import { Lot } from "@/actions/inventory/lots/getAll";
import { useQcExaminationActions } from "@/store/qcExaminationSlice";
import { useEffect } from "react";

type Props = {
  lots: Lot[],
}

const StateSetter = ({
  lots,
}: Props) => {

  const { setLots } = useQcExaminationActions()

  useEffect(() => {
    setLots(lots);
  }, [
    lots,
    setLots,
  ])

  return false;
}

export default StateSetter

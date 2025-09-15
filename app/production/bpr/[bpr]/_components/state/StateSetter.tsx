'use client'
import { useEffect } from "react";
import { ProductionBpr } from "../../_actions/getProductionBpr";
import { useProductionActions, useProductionSelection } from "@/store/productionSlice";
import { BprBomItem } from "../../_actions/getBprBom";
import { ProductionStep } from "../../_actions/compounding/getSteps";

type Props = {
  bpr: ProductionBpr,
  bom: BprBomItem[],
  steps: ProductionStep[]
}

const StateSetter = ({
  bpr: serverBpr,
  bom: serverBom,
  steps,

}: Props) => {

  const { setBpr, setBom, setViewStatuses, setSteps } = useProductionActions()
  const { bpr, bom } = useProductionSelection()

  useEffect(() => {
    setBpr(serverBpr);
  }, [serverBpr, setBpr])


  useEffect(() => {
    setBom(serverBom);
    setSteps(steps)
  }, [bpr, setBom,])

  useEffect(() => {
    setViewStatuses()
  }, [setViewStatuses, bom, bpr])


  return false;

}

export default StateSetter

'use client'
import { useEffect } from "react";
import { ProductionBpr } from "../../_actions/getProductionBpr";
import { useProductionActions, useProductionSelection } from "@/store/productionSlice";
import { BprBomItem } from "../../_actions/getBprBom";

type Props = {
  bpr: ProductionBpr,
  bom: BprBomItem[],
}

const StateSetter = ({
  bpr: serverBpr,
  bom: serverBom,

}: Props) => {

  const { setBpr, setBom, setViewStatuses } = useProductionActions()
  const { bpr, bom } = useProductionSelection()

  useEffect(() => {
    setBpr(serverBpr);
  }, [serverBpr, setBpr])


  useEffect(() => {
    setBom(serverBom);
  }, [bpr, setBom,])

  useEffect(() => {
    setViewStatuses()
  }, [setViewStatuses, bom, bpr])


  return false;

}

export default StateSetter

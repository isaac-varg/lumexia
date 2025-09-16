'use client'
import { useEffect } from "react";
import { ProductionBpr } from "../../_actions/getProductionBpr";
import { useProductionActions, useProductionSelection } from "@/store/productionSlice";
import { BprBomItem } from "../../_actions/getBprBom";
import { ProductionStep } from "../../_actions/compounding/getSteps";
import { BprNote } from "@/actions/production/bprs/notes/getAllByBpr";

type Props = {
  bpr: ProductionBpr,
  bom: BprBomItem[],
  steps: ProductionStep[]
  notes: BprNote[],
}

const StateSetter = ({
  bpr: serverBpr,
  bom: serverBom,
  steps,
  notes,
}: Props) => {

  const { setBpr, setBom, setBprNotes, setViewStatuses, setSteps, getBprNoteType } = useProductionActions()
  const { bpr, bom, bprNoteTypes, } = useProductionSelection()

  useEffect(() => {
    setBpr(serverBpr);
  }, [serverBpr, setBpr])


  useEffect(() => {
    setBom(serverBom);
    setSteps(steps);
    setBprNotes(notes);

    if (bprNoteTypes.length === 0) {
      getBprNoteType();
    }
  }, [bpr, steps, serverBom, notes, setBprNotes, setBom, getBprNoteType, setSteps,])

  useEffect(() => {
    setViewStatuses()
  }, [setViewStatuses, bom, bpr])


  return false;

}

export default StateSetter

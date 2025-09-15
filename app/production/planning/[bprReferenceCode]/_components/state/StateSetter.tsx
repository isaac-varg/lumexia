'use client'

import { BprBomItemInventory } from "@/actions/inventory/inventory/getAllByBom"
import { BprActivity } from "@/actions/production/bprs/activity/getActivity"
import { BprBomItem } from "@/actions/production/bprs/boms/getByBpr"
import { BatchProductionRecord } from "@/actions/production/bprs/getOne"
import { BprNote } from "@/actions/production/bprs/notes/getAllByBpr"
import { useBprDetailsActions, useBprDetailsSelection } from "@/store/bprDetailsSlice"
import { useEffect } from "react"

type Props = {
  activity: BprActivity[]
  bpr: BatchProductionRecord
  bom: BprBomItem[]
  bomInventory: BprBomItemInventory[]
  notes: BprNote[]
}

const StateSetter = ({
  activity,
  bpr,
  bom,
  bomInventory,
  notes,
}: Props) => {

  const {
    setActivity,
    setBpr,
    setBom,
    setBomInventory,
    setNotes,
    getOptions,
  } = useBprDetailsActions()

  const { options } = useBprDetailsSelection()

  useEffect(() => {
    setBpr(bpr);
  }, [bpr, setBpr])

  useEffect(() => {
    setBom(bom);
    setActivity(activity);
    setNotes(notes)
  }, [bom, bpr, notes, setBom, setActivity, setNotes,]);

  useEffect(() => {
    setBomInventory(bomInventory);
  }, [bom, setBomInventory])

  useEffect(() => {
    if (options.noteTypes.length === 0) {
      getOptions()
    }

  }, [bpr])


  return false
}

export default StateSetter

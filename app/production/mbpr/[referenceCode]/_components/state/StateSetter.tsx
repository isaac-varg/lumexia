'use client'

import { RecordStatus } from "@/actions/app/recordStatuses/getAllRecordStatuses"
import { MbprActivity } from "@/actions/production/mbpr/activity/getActivity"
import { Mbpr } from "@/actions/production/mbpr/getOneMbpr"
import { MbprNote } from "@/actions/production/mbpr/notes/getAllByMbpr"
import { useMbprDetailsActions, useMbprDetailsSelection } from "@/store/mbprDetailsSlice"
import { useEffect } from "react"

type Props = {
  mbpr: Mbpr
  notes: MbprNote[]
  activity: MbprActivity[]
  statuses: RecordStatus[]
}

const StateSetter = ({ mbpr, notes, activity, statuses }: Props) => {

  const {
    setMbpr,
    setNotes,
    setActivity,
    setStatuses,
    getOptions,
  } = useMbprDetailsActions()

  const { options } = useMbprDetailsSelection()

  useEffect(() => {
    setMbpr(mbpr)
  }, [mbpr, setMbpr])

  useEffect(() => {
    setNotes(notes)
    setActivity(activity)
    setStatuses(statuses)
  }, [notes, activity, statuses, setNotes, setActivity, setStatuses])

  useEffect(() => {
    if (options.noteTypes.length === 0) {
      getOptions()
    }
  }, [mbpr])

  return false
}

export default StateSetter

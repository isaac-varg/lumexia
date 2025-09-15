'use client'
import { BprStatus } from "@/actions/production/bprs/statuses/getAll";
import { PlanningBpr } from "@/actions/production/getPlanningBprs";
import { useBprPlanningActions } from "@/store/bprPlanningSlice";
import { useEffect } from "react";

type Props = {
  bprs: PlanningBpr[]
  statuses: BprStatus[]
}

const StateSetter = ({ bprs, statuses }: Props) => {

  const { setBprs, setStatuses } = useBprPlanningActions()
  useEffect(() => {
    setBprs(bprs)
    setStatuses(statuses)

  }, [bprs, statuses])

  return false;
}

export default StateSetter

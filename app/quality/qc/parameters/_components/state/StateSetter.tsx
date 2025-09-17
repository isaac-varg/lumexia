'use client'

import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import { useQcParameterActions } from "@/store/qcParametersSlice"
import { useEffect } from "react"

type Props = {
  parameters: QcParameter[],
}

const StateSetter = ({
  parameters,
}: Props) => {

  const { setParameters } = useQcParameterActions()

  useEffect(() => {
    setParameters(parameters);
  }, [parameters, setParameters]);


  return false
}

export default StateSetter

'use client'
import { QcParameter } from "@/actions/quality/qc/parameters/getAll";
import { useQcParameterActions } from "@/store/qcParametersSlice";
import { useEffect } from "react";

type Props = {
  parameter: QcParameter,
}

const StateSetter = ({
  parameter,
}: Props) => {

  const { setSelectedParameter } = useQcParameterActions()

  useEffect(() => {
    setSelectedParameter(parameter);
  }, [parameter, setSelectedParameter])

  return false;

}

export default StateSetter

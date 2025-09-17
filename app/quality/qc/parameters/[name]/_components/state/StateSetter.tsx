'use client'
import { ParameterInputDefinition } from "@/actions/quality/qc/inputDefinitions/getAll";
import { QcParameter } from "@/actions/quality/qc/parameters/getAll";
import { useQcParameterActions, useQcParameterSelection } from "@/store/qcParametersSlice";
import { useEffect } from "react";

type Props = {
  inputDefinitions: ParameterInputDefinition[],
  parameter: QcParameter,
}

const StateSetter = ({
  inputDefinitions,
  parameter,
}: Props) => {

  const { getDataTypes, setSelectedParameter, setParameterInputDefinitions } = useQcParameterActions()
  const { dataTypes } = useQcParameterSelection()

  useEffect(() => {
    setSelectedParameter(parameter);

    if (dataTypes.length === 0) {
      getDataTypes()
    }

    setParameterInputDefinitions(inputDefinitions);
  }, [parameter, setSelectedParameter, getDataTypes, setParameterInputDefinitions])

  return false;

}

export default StateSetter

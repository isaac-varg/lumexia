'use client'
import { ParameterInputDefinition } from "@/actions/quality/qc/inputDefinitions/getAll";
import { QcParameter } from "@/actions/quality/qc/parameters/getAll";
import { useQcParameterActions, useQcParameterSelection } from "@/store/qcParametersSlice";
import { useEffect } from "react";
import { ParameterGroup } from "../../_actions/getParameterGroups";
import { ParameterTemplate } from "../../_actions/getParameterTemplates";

type Props = {
  inputDefinitions: ParameterInputDefinition[],
  parameter: QcParameter,
  parameterGroups: ParameterGroup[],
  parameterTemplates: ParameterTemplate[],
}

const StateSetter = ({
  inputDefinitions,
  parameter,
  parameterGroups,
  parameterTemplates,
}: Props) => {

  const { getDataTypes, setSelectedParameter, setParameterInputDefinitions, setParameterTemplates, setParameterGroups } = useQcParameterActions()
  const { dataTypes } = useQcParameterSelection()

  useEffect(() => {
    setSelectedParameter(parameter);

    if (dataTypes.length === 0) {
      getDataTypes()
    }

    setParameterInputDefinitions(inputDefinitions);
    setParameterGroups(parameterGroups);
    setParameterTemplates(parameterTemplates);
  }, [parameter, parameterGroups, parameterTemplates, setSelectedParameter, getDataTypes, setParameterInputDefinitions, setParameterGroups, setParameterTemplates])

  return false;

}

export default StateSetter

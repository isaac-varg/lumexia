'use client'
import { ParameterInputDefinition } from "@/actions/quality/qc/inputDefinitions/getAll";
import { QcParameter } from "@/actions/quality/qc/parameters/getAll";
import { useQcParameterActions, useQcParameterSelection } from "@/store/qcParametersSlice";
import { useEffect } from "react";
import { ParameterGroup } from "../../_actions/getParameterGroups";
import { ParameterTemplate } from "../../_actions/getParameterTemplates";
import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll";
import { QcTemplate } from "@/actions/quality/qc/templates/getAll";

type Props = {
  inputDefinitions: ParameterInputDefinition[],
  parameter: QcParameter,
  parameterGroups: ParameterGroup[],
  parameterTemplates: ParameterTemplate[],
  groups: QcParameterGroup[],
  templates: QcTemplate[],
}

const StateSetter = ({
  inputDefinitions,
  parameter,
  parameterGroups,
  parameterTemplates,
  groups,
  templates,
}: Props) => {

  const { getDataTypes, setSelectedParameter, setParameterInputDefinitions, setParameterTemplates, setParameterGroups, setGroups, setTemplates, } = useQcParameterActions()
  const { dataTypes } = useQcParameterSelection()

  useEffect(() => {
    setSelectedParameter(parameter);

    if (dataTypes.length === 0) {
      getDataTypes()
    }

    setParameterInputDefinitions(inputDefinitions);
    setParameterGroups(parameterGroups);
    setParameterTemplates(parameterTemplates);
    setGroups(groups);
    setTemplates(templates);
  }, [parameter, parameterGroups, parameterTemplates, groups, templates, setSelectedParameter, getDataTypes, setParameterInputDefinitions, setParameterGroups, setParameterTemplates, setGroups, setTemplates])

  return false;

}

export default StateSetter

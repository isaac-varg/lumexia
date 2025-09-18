'use client'

import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll"
import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import { QcTemplate, QcTemplateParameter } from "@/actions/quality/qc/templates/getAll"
import { useQcParameterActions } from "@/store/qcParametersSlice"
import { useEffect } from "react"

type Props = {
  parameters: QcParameter[]
  templates: QcTemplate[]
  groups: QcParameterGroup[]
}

const StateSetter = ({
  parameters,
  templates,
  groups,
}: Props) => {

  const { setParameters, setTemplates, setGroups } = useQcParameterActions()

  useEffect(() => {
    setParameters(parameters);
    setTemplates(templates);
    setGroups(groups);
  }, [parameters, groups, templates, setParameters, setTemplates, setGroups,]);


  return false
}

export default StateSetter

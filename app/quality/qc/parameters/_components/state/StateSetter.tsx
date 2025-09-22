'use client'

import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll"
import { QcParameterGroup } from "@/actions/quality/qc/groups/getAll"
import { QcParameter } from "@/actions/quality/qc/parameters/getAll"
import { QcTemplate, QcTemplateParameter } from "@/actions/quality/qc/templates/getAll"
import { useQcParameterActions } from "@/store/qcParametersSlice"
import { useEffect } from "react"

type Props = {
  parameters: QcParameter[]
  templates: QcTemplate[]
  groups: QcParameterGroup[]
  examinationTypes: ExaminationType[]
}

const StateSetter = ({
  parameters,
  templates,
  groups,
  examinationTypes,
}: Props) => {

  const { setParameters, setTemplates, setGroups, setExaminationTypes, } = useQcParameterActions()

  useEffect(() => {
    setParameters(parameters);
    setTemplates(templates);
    setGroups(groups);
    setExaminationTypes(examinationTypes)
  }, [parameters, groups, templates, examinationTypes, setParameters, setTemplates, setGroups, setExaminationTypes]);


  return false
}

export default StateSetter

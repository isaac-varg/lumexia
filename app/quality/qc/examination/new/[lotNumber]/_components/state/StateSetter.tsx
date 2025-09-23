'use client'
import { SingleLot } from "@/actions/inventory/lots/getOne";
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem";
import { QcExamination } from "@/actions/quality/qc/records/getAll";
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice";
import { useEffect } from "react";
import { ExaminationResults } from "../../_actions/getResults";

type Props = {
  specimenLot: SingleLot;
  itemParameters: QcItemParameter[];
  examinationTypes: ExaminationType[];
  record: QcExamination;
  results: ExaminationResults[];
}

const StateSetter = ({
  specimenLot,
  examinationTypes,
  itemParameters,
  record,
  results,
}: Props) => {

  const {
    setSpecimentLot,
    setStep,
    setExaminationTypes,
    setItemParameters,
    setRecord,
    setResults,
  } = useQcExaminationActions()



  useEffect(() => {
    setSpecimentLot(specimenLot)
    setExaminationTypes(examinationTypes)
    setItemParameters(itemParameters)
    setRecord(record);
    setResults(results)
  }, [
    specimenLot,
    examinationTypes,
    itemParameters,
    record,
    results,
    setSpecimentLot,
    setExaminationTypes,
    setItemParameters,
    setRecord,
    setResults,
  ])

  useEffect(() => {
    setStep(1)

  }, []);

  return false
}

export default StateSetter

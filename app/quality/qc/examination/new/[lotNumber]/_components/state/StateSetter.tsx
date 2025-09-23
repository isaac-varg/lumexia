'use client'
import { SingleLot } from "@/actions/inventory/lots/getOne";
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem";
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice";
import { useEffect } from "react";

type Props = {
  specimenLot: SingleLot;
  itemParameters: QcItemParameter[];
  examinationTypes: ExaminationType[];

}

const StateSetter = ({
  specimenLot,
  examinationTypes,
  itemParameters,
}: Props) => {

  const {
    setSpecimentLot,
    setStep,
    setExaminationTypes,
    setItemParameters,
    createQcRecord,
  } = useQcExaminationActions()

  const { step } = useQcExaminationSelection()

  useEffect(() => {
    setSpecimentLot(specimenLot)
    setExaminationTypes(examinationTypes)
    setItemParameters(itemParameters)
  }, [
    specimenLot,
    examinationTypes,
    itemParameters,
    setSpecimentLot,
    setExaminationTypes,
    setItemParameters,
  ])

  useEffect(() => {
    setStep(1)

  }, []);

  useEffect(() => {

    if (step === 2) {
      createQcRecord();
    }

  }, [step, createQcRecord])

  return false
}

export default StateSetter

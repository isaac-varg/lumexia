'use client'
import { SingleLot } from "@/actions/inventory/lots/getOne";
import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll";
import { QcItemParameter } from "@/actions/quality/qc/parameters/getAllByItem";
import { QcExamination } from "@/actions/quality/qc/records/getAll";
import { useQcExaminationActions, useQcExaminationSelection } from "@/store/qcExaminationSlice";
import { useEffect } from "react";
import { ExaminationResults } from "../../_actions/getResults";
import { QcRecordNote } from "@/actions/quality/qc/recordNotes/getAllByRecord";
import { QcRecordNoteType } from "@/actions/quality/qc/recordNotes/types/getAll";
import { QcRecordFile } from "@/actions/quality/qc/recordFiles/getAllByRecord";
import { QcRecordFileType } from "@/actions/quality/qc/recordFiles/types/getAll";

type Props = {
  specimenLot: SingleLot;
  itemParameters: QcItemParameter[];
  examinationTypes: ExaminationType[];
  record: QcExamination;
  results: ExaminationResults[];
  notes: QcRecordNote[];
  noteTypes: QcRecordNoteType[];
  files: QcRecordFile[];
  fileTypes: QcRecordFileType[];
}

const StateSetter = ({
  specimenLot,
  examinationTypes,
  itemParameters,
  record,
  results,
  notes,
  noteTypes,
  files,
  fileTypes,
}: Props) => {

  const {
    setSpecimentLot,
    setStep,
    setExaminationTypes,
    setItemParameters,
    setRecord,
    setResults,
    setNotes,
    setNoteTypes,
    setFiles,
    setFileTypes,
  } = useQcExaminationActions()



  useEffect(() => {
    setSpecimentLot(specimenLot)
    setExaminationTypes(examinationTypes)
    setItemParameters(itemParameters)
    setRecord(record);
    setResults(results);
    setNotes(notes);
    setNoteTypes(noteTypes);
    setFiles(files);
    setFileTypes(fileTypes);
  }, [
    specimenLot,
    examinationTypes,
    itemParameters,
    record,
    results,
    notes,
    noteTypes,
    files,
    fileTypes,
    setSpecimentLot,
    setExaminationTypes,
    setItemParameters,
    setRecord,
    setResults,
    setNotes,
    setNoteTypes,
    setFiles,
    setFileTypes,
  ])

  useEffect(() => {
    setStep(1)

  }, []);

  return false
}

export default StateSetter

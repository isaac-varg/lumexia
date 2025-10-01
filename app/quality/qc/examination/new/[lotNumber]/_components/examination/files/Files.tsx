import { qualityActions } from "@/actions/quality";
import { QcRecordFile } from "@/actions/quality/qc/recordFiles/getAllByRecord";
import { FileResponseData } from "@/app/api/upload/route";
import SectionTitle from "@/components/Text/SectionTitle";
import FileManager from "@/components/Uploader/FileManager";
import { qcRecordFileTypes } from "@/configs/staticRecords/qcRecordFileTypes";
import { useQcExaminationSelection } from "@/store/qcExaminationSlice";

const Files = () => {
  const { qcRecord, files } = useQcExaminationSelection()
  const handleFileComplete = async (data: FileResponseData) => {
    if (!qcRecord) return;
    await qualityActions.qc.recordFiles.create({
      qcRecordId: qcRecord.id,
      fileTypeId: qcRecordFileTypes.general,
      fileId: data.fileId,
    })
  }

  const handleFileDelete = async (file: QcRecordFile) => {
    console.log('no delete', file)
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle>Attachments</SectionTitle>
      <FileManager<QcRecordFile> files={files} onFileComplete={handleFileComplete} onFileDelete={handleFileDelete} />

    </div>
  )
}

export default Files

import { FileResponseData } from "@/app/api/upload/route"
import Card from "@/components/Card"
import Uploader from "@/components/Uploader/Uploader"
import { useItemSelection } from "@/store/itemSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ItemFileType } from "../../_actions/files/getItemFilesTypes"
import { createItemFile } from "../../_actions/files/createItemFile"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"

const Upload = () => {

  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'type'>('upload')
  const [filesData, setFilesData] = useState<FileResponseData[]>([]);
  const { item, options } = useItemSelection()

  const handleUpload = (results: FileResponseData[]) => {
    setFilesData(results);
    setStep('type');
  }

  const handleComplete = async (type: ItemFileType) => {
    if (filesData.length === 0 || !item) return;

    await Promise.all(
      filesData.map(file =>
        createItemFile({ fileTypeId: type.id, fileId: file.fileId, itemId: item.id })
      )
    );

    const context = filesData.length === 1
      ? `Uploaded file ${filesData[0].name}`
      : `Uploaded ${filesData.length} files`;
    await createActivityLog('uploadFile', 'item', item.id, { context });

    setFilesData([]);
    setStep('upload');
    router.refresh();
  }


  return (
    <Card.Root>
      <Card.Title>{step === 'upload' ? 'Upload' : 'Select Type'}</Card.Title>

      {step === 'upload' && (
        <Uploader
          pathPrefix="/item/"
          multiple
          onMultipleComplete={handleUpload}
        />
      )}

      {step === 'type' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-base-content/60 font-poppins">
            {filesData.length === 1
              ? 'Choose a file type to finish uploading.'
              : `Choose a file type for all ${filesData.length} uploaded files.`}
          </p>
          <div className="flex flex-wrap gap-3">
            {options.itemFileTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleComplete(type)}
                className="btn btn-md capitalize font-poppins"
                style={{ backgroundColor: type.bgColor, color: type.textColor }}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      )}


    </Card.Root>
  )
}

export default Upload

import { getUserId } from "@/actions/users/getUserId"
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
  const [fileData, setFileData] = useState<FileResponseData>();
  const { item, options } = useItemSelection()

  const handleUpload = (data: FileResponseData) => {
    setFileData(data);
    setStep('type');
  }

  const handleComplete = async (type: ItemFileType) => {

    if (!fileData || !item) return;

    // create the itemFile entry
    await createItemFile({
      fileTypeId: type.id,
      fileId: fileData?.fileId,
      itemId: item.id,
    })

    // add to itemlog
    await createActivityLog('uploadFile', 'item', item.id, { context: `Uploaded file ${fileData.name}` })

    // refresh
    setStep('upload')
    router.refresh();
  }


  return (
    <Card.Root>
      <Card.Title>{step === 'upload' ? 'Upload' : 'Select Type'}</Card.Title>

      {step === 'upload' && <Uploader pathPrefix="/item/" onComplete={handleUpload} />}

      {step === 'type' && (
        <div className="grid grid-cols-3 gap-6">


          {options.itemFileTypes.map(type => {

            return (
              <button onClick={() => handleComplete(type)} key={type.id} className="btn btn-xl min-h-40">{type.name}</button>
            )
          })}

        </div>
      )}


    </Card.Root>
  )
}

export default Upload

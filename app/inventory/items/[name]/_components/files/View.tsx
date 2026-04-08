import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { useEffect, useState } from "react"
import { ItemFile } from "../../_actions/files/getAllItemFiles"
import { handleDeleteFile } from "../../_actions/files/handleDeleteFile"
import { useRouter } from "next/navigation"
import FileButton from "@/components/Uploader/FileButton"

const View = () => {

  const { options, files } = useItemSelection()
  const [selectedType, setSelectedType] = useState<{ id: string, name: string }>({ id: 'default', name: 'all' })
  const [shownFiles, setShownFiles] = useState<ItemFile[]>(files)
  const types = options.itemFileTypes.map((t) => ({ id: t.id, name: t.name }));
  const router = useRouter();

  const onEditClick = () => {
    console.log('edit not yet available');
  }

  const onDeleteClick = async (file: ItemFile) => {

    await handleDeleteFile(file)
    router.refresh()
  }


  useEffect(() => {

    if (selectedType.id === 'default') {
      setShownFiles(files);
      return;
    }

    const filter = files.filter(f => f.fileTypeId === selectedType.id);
    setShownFiles(filter);
  }, [files, selectedType])

  return (
    <Card.Root span={2}>
      <div className="flex flex-col gap-6">

        <Card.Title>Types</Card.Title>
        <div className="grid grid-cols-4 gap-4">

          <button
            onClick={() => setSelectedType({ id: 'default', name: 'all' })}
            className={`${selectedType.id === 'default' ? 'btn-accent' : 'btn-soft'} capitalize btn btn-xl min-h-32`}
          >
            all
          </button>

          {types.map(t => {
            const isSelected = selectedType.id === t.id;
            return (
              <button
                key={t.id}
                className={`${isSelected ? 'btn-accent' : 'btn-soft'} btn btn-xl min-h-32 capitalize`}
                onClick={() => setSelectedType(t)}
              >
                {t.name}
              </button>
            )
          })}
        </div>

        <Card.Title>Files</Card.Title>


        <div className="grid grid-cols-4 gap-4">
          {shownFiles.map(file => (
            <FileButton
              key={file.id}
              shape="vertical"
              label={file.file.name}
              url={file.url}
              thumbnailUrl={file.thumbnailUrl}
              mimeType={file.file.mimeType}
              uploadedByName={file.file.uploadedBy.name || ''}
              uploadedByImage={file.file.uploadedBy.image || ''}
              fileTag={{ label: file.fileType.name, bgColor: file.fileType.bgColor, textColor: file.fileType.textColor }}
              onEditClick={() => onEditClick()}
              onDeleteClick={() => onDeleteClick(file)}
            />
          ))}
        </div>
      </div>
    </Card.Root>

  )
}

export default View

import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { useEffect, useState } from "react"
import { ItemFile } from "../../_actions/files/getAllItemFiles"
import Tag from "@/components/Text/Tag"
import UserIcon from "@/components/UI/UserIcon"
import ContextMenu from "@/components/ContextMenu"
import { ItemFileType } from "../../_actions/files/getItemFilesTypes"
import { handleDeleteFile } from "../../_actions/files/handleDeleteFile"
import { useRouter } from "next/navigation"

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
          {shownFiles.map(file => {
            return (
              <ContextMenu.Root key={file.id}>
                <ContextMenu.Trigger asChild>

                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    <div className="flex flex-col gap-4 min-h-30  rounded-xl bg-base-300/30 p-8 hover:cursor-pointer hover:bg-accent/50">
                      <div className='flex justify-between items-center'>
                        <UserIcon image={file.file.uploadedBy.image || ''} name={file.file.uploadedBy.name || ''} />
                        <Tag bgColor={file.fileType.bgColor} textColor={file.fileType.textColor} label={file.fileType.name} />
                      </div>

                      <h2 className="text-base-content font-semibold text-lg">{file.file.name}</h2>
                    </div>
                  </a>

                </ContextMenu.Trigger>
                <ContextMenu.Content>
                  <ContextMenu.Item onClick={() => onEditClick()}>
                    Edit
                  </ContextMenu.Item>
                  <ContextMenu.Item onClick={() => onDeleteClick(file)}>
                    Delete
                  </ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            )
          })}

        </div>
      </div>
    </Card.Root>

  )
}

export default View

import Card from "@/components/Card"
import { useItemSelection } from "@/store/itemSlice"
import { useEffect, useState } from "react"
import { ItemFile } from "../../_actions/files/getAllItemFiles"
import { handleDeleteFile } from "../../_actions/files/handleDeleteFile"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Tag from "@/components/Text/Tag"
import ContextMenu from "@/components/ContextMenu"

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

        <div className="flex items-center justify-between">
          <Card.Title>Files</Card.Title>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType({ id: 'default', name: 'all' })}
              className={`btn btn-sm capitalize ${selectedType.id === 'default' ? 'btn-accent' : 'btn-ghost'}`}
            >
              All
            </button>
            {types.map(t => (
              <button
                key={t.id}
                className={`btn btn-sm capitalize ${selectedType.id === t.id ? 'btn-accent' : 'btn-ghost'}`}
                onClick={() => setSelectedType(t)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {shownFiles.map(file => {
            const extType = file.file.mimeType === 'application/pdf' ? 'pdf'
              : file.file.mimeType.startsWith('image/') ? 'image'
              : 'other';
            const { name: uploaderName, image: uploaderImage } = file.file.uploadedBy;

            return (
              <ContextMenu.Root key={file.id}>
                <ContextMenu.Trigger asChild>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    <div className="card card-side bg-base-100 shadow-sm hover:shadow-md hover:cursor-pointer transition-shadow">
                      <figure className="w-32 shrink-0">
                        {file.thumbnailUrl ? (
                          <Image
                            className="h-full w-full object-cover"
                            src={file.thumbnailUrl}
                            alt={file.file.name}
                            width={128}
                            height={160}
                          />
                        ) : (
                          <div className="h-full w-full bg-base-300 flex items-center justify-center">
                            <span className="text-base-content/40 text-xs uppercase font-poppins font-semibold">
                              {extType}
                            </span>
                          </div>
                        )}
                      </figure>

                      <div className="card-body gap-2 min-w-0">
                        <h2 className="card-title text-sm font-poppins truncate">{file.file.name}</h2>

                        <div className="flex flex-wrap gap-2">
                          <Tag text="normal" color="accent" label={extType} tooltip="Extension" />
                          <Tag
                            text="normal"
                            bgColor={file.fileType.bgColor}
                            textColor={file.fileType.textColor}
                            label={file.fileType.name}
                            tooltip="File Type"
                          />
                        </div>

                        {uploaderName && uploaderImage && (
                          <div className="card-actions mt-auto">
                            <div className="tooltip" data-tip={uploaderName}>
                              <Image
                                src={uploaderImage}
                                className="rounded-full h-7 w-7"
                                alt={uploaderName}
                                width={28}
                                height={28}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                </ContextMenu.Trigger>

                <ContextMenu.Content>
                  <ContextMenu.Item onClick={() => onEditClick()}>Edit</ContextMenu.Item>
                  <ContextMenu.Item onClick={() => onDeleteClick(file)}>Delete</ContextMenu.Item>
                </ContextMenu.Content>
              </ContextMenu.Root>
            );
          })}
        </div>
      </div>
    </Card.Root>
  )
}

export default View

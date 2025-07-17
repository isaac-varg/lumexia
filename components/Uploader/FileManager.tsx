'use client'
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import Uploader from "@/components/Uploader/Uploader"
import { FileResponseData } from "@/app/api/upload/route"
import { useRouter } from "next/navigation"
import FileButton from "@/components/Uploader/FileButton"
import { LumexiaFile } from "@/actions/files/getAll"



export interface ManagerFileType {
    name: string
    bgColor: string
    textColor: string
}

export interface ManagerFile {
    id: string
    url: string
    file: LumexiaFile
    fileType?: ManagerFileType
}

interface FileManagerProps<TFile extends ManagerFile, TFileTypes extends ManagerFileType = ManagerFileType> {
    files: TFile[]
    fileTypes?: TFileTypes[]
    span?: 1 | 2 | 3
    onFileComplete: (fileRespons: FileResponseData) => void;
}

const FileManager = <TFile extends ManagerFile, TFileTypes extends ManagerFileType = ManagerFileType>({ files, fileTypes, span = 2, onFileComplete }: FileManagerProps<TFile, TFileTypes>) => {

    const router = useRouter();

    const handleComplete = async (data: FileResponseData) => {

        onFileComplete(data);
        router.refresh();
    }

    const handleEdit = (file: any) => {
    }

    const handleDelete = async (file: any) => {
        console.log('deleted!')
        router.refresh()
    }

    return (
        <Panels.Root span={span}>
            <SectionTitle size="small">Files</SectionTitle>



            <div className="grid grid-cols-3 gap-4">

                <Uploader pathPrefix="/accounting/pos" onComplete={handleComplete} />
                {files.map(file => (
                    <FileButton
                        key={file.id}
                        shape="vertical"
                        label={file.file.name}
                        url={file.url}
                        mimeType={file.file.mimeType}
                        onEditClick={() => handleEdit(file)}
                        onDeleteClick={() => handleDelete(file)}
                         {...(file.fileType
                            ? {
                                fileTag: {
                                    label: file.fileType.name,
                                    bgColor: file.fileType.bgColor,
                                    textColor: file.fileType.textColor,
                                },
                              }
                            : {})}
                        uploadedByName={file.file.uploadedBy.name || ''}
                        uploadedByImage={file.file.uploadedBy.image || ''} />))}
            </div>

        </Panels.Root>
    )
}

export default FileManager

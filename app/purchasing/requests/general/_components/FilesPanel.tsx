import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import FileManager from "@/components/Uploader/FileManager"
import { GeneralRequestFile } from "../_actions/getAllGeneralRequestFiles"
import { FileResponseData } from "@/app/api/upload/route"

const FilesPanel = ({ files }: { files: GeneralRequestFile[] }) => {

    const handleFileComplete = async (data: FileResponseData) => {
        console.log(data)
    }
    return (
        <Panels.Root>
            <SectionTitle size="small">Files</SectionTitle>

            <FileManager<GeneralRequestFile> files={files} onFileComplete={handleFileComplete} />

        </Panels.Root>
    )
}

export default FilesPanel

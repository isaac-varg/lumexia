import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import FileManager from "@/components/Uploader/FileManager"
import { GeneralRequestFile } from "../_actions/getAllGeneralRequestFiles"
import { FileResponseData } from "@/app/api/upload/route"
import { createGeneralRequestFile } from "../_actions/createGeneralRequestFile"
import { deleteGeneralRequestFile } from "../_actions/deleteGeneralRequestFile"

const FilesPanel = ({ files, requestId }: { files: GeneralRequestFile[], requestId: string }) => {

    const handleFileComplete = async (data: FileResponseData) => {
        await createGeneralRequestFile(requestId, data.fileId);
    }

    const handleFileDelete = async (file: GeneralRequestFile) => {
        await deleteGeneralRequestFile(file)
    }

    return (
        <Panels.Root span={2}>
            <FileManager<GeneralRequestFile > files={files} onFileComplete={handleFileComplete} onFileDelete={handleFileDelete} />

        </Panels.Root>
    )
}

export default FilesPanel

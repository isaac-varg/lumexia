'use client'
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { AccountingFile } from "../../_actions/getAccountingFilesByPo"
import Uploader from "@/components/Uploader/Uploader"
import { FileResponseData } from "@/app/api/upload/route"
import { createPoAccountingFile } from "../../_actions/createPoAccountingFile"
import { useRouter } from "next/navigation"
import FileButton from "@/components/Uploader/FileButton"

const AccountingFiles = ({ files, poId }: { files: AccountingFile[], poId: string }) => {

    const router = useRouter();

    const handleComplete = async (data: FileResponseData) => {
        await createPoAccountingFile({
            fileTypeId: '9b24e26b-3ce5-469b-96a2-37ebe779b783',
            fileId: data.fileId,
            purchaseOrderId: poId,
        })

        router.refresh();
    }

    return (
        <Panels.Root span={2}>
            <SectionTitle size="small">Files</SectionTitle>

            <Uploader pathPrefix="/accounting/pos" onComplete={handleComplete} />


            <div className="grid grid-cols-3 gap-4">
                {files.map(file => <FileButton label={file.file.name} url={file.url} mimeType={file.file.mimeType} />)}
            </div>

        </Panels.Root>
    )
}

export default AccountingFiles

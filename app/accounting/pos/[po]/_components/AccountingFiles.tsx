'use client'
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import { AccountingFile } from "../../_actions/getAccountingFilesByPo"
import Uploader from "@/components/Uploader/Uploader"
import { FileResponseData } from "@/app/api/upload/route"
import { createPoAccountingFile } from "../../_actions/createPoAccountingFile"
import { useRouter } from "next/navigation"
import FileButton from "@/components/Uploader/FileButton"
import useDialog from "@/hooks/useDialog"
import { AccountingFileTypes } from "../../_actions/getAccountingFileTags"
import { deleteAccountingFile } from "../../_actions/deleteAccountingFile"
import { createAccountingAuditLog } from "../../_actions/createAccountingAuditLog"
import { getUserId } from "@/actions/users/getUserId"

const AccountingFiles = ({ files, poId, fileTypes, span = 2 }: { files: AccountingFile[], poId: string, fileTypes: AccountingFileTypes[], span?: 1 | 2 | 3 }) => {

    const router = useRouter();


    const handleComplete = async (data: FileResponseData) => {
        const userId = await getUserId()
        await createPoAccountingFile({
            fileTypeId: '9b24e26b-3ce5-469b-96a2-37ebe779b783',
            fileId: data.fileId,
            purchaseOrderId: poId,
        })

        await createAccountingAuditLog({
            poId: poId,
            userId,
            action: 'Add File',
            context: `${data.name} was added.`
        })

        router.refresh();
    }

    const handleEdit = (file: AccountingFile) => {
    }

    const handleDelete = async (file: AccountingFile) => {

        const userId = await getUserId()

        await deleteAccountingFile(file)
        await createAccountingAuditLog({
            poId,
            userId,
            action: 'Remove File',
            context: `${file.file.name} was deleted.`
        })

        router.refresh()
    }

    return (
        <Panels.Root span={span}>
            <SectionTitle size="small">Files</SectionTitle>



            <div className="grid grid-cols-3 gap-4">

                <Uploader pathPrefix="/accounting/pos" onComplete={handleComplete} />
                {files.map(file => <FileButton key={file.id} shape="vertical" label={file.file.name} url={file.url} mimeType={file.file.mimeType} onEditClick={() => handleEdit(file)} onDeleteClick={() => handleDelete(file)} fileTag={{ label: file.fileType.name, bgColor: file.fileType.bgColor, textColor: file.fileType.textColor }} uploadedByName={file.file.uploadedBy.name || ''} uploadedByImage={file.file.uploadedBy.image || ''} />)}
            </div>

        </Panels.Root>
    )
}

export default AccountingFiles

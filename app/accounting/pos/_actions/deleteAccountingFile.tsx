'use server'

import prisma from "@/lib/prisma"
import { AccountingFile } from "./getAccountingFilesByPo"
import { getUserId } from "@/actions/users/getUserId"

export const deleteAccountingFile = async (file: AccountingFile) => {

    const userId = await getUserId()
    const accountingFileRes = await prisma.poAccountingFile.delete({
        where: { id: file.id },
    })

    const fileRes = await prisma.file.delete({
        where: { id: file.file.id }
    })

    const res = await prisma.poAccountingAuditLog.create({
        data: {
            userId,
            action: 'Remove File',
            context: `${file.file.name} was removed`
        }
    })

    return res;
}

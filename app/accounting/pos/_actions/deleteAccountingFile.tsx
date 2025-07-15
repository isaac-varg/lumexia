'use server'

import prisma from "@/lib/prisma"
import { AccountingFile } from "./getAccountingFilesByPo"

export const deleteAccountingFile = async (file: AccountingFile) => {

    await prisma.poAccountingFile.delete({
        where: { id: file.id },
    })

    const fileRes = await prisma.file.delete({
        where: { id: file.file.id }
    })


    return fileRes;
}

'use server'

import prisma from "@/lib/prisma"
import { GeneralRequestFile } from "./getAllGeneralRequestFiles"

export const deleteGeneralRequestFile = async (file: GeneralRequestFile) => {
    await prisma.generalRequestFile.delete({
        where: {
            id: file.id
        }
    });

    const res = await prisma.file.delete({
        where: {
            id: file.file.id
        }
    });

    return res
}

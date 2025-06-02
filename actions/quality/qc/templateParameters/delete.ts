"use server"

import prisma from "@/lib/prisma"

export const deleteTemplateParameter = async (id: string) => {
    const res = await prisma.qcTemplateParameter.delete({
        where: {
            id,
        }
    });

    return res;
}

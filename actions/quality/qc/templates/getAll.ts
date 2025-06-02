"use server"

import prisma from "@/lib/prisma"

export const getAllQcTemplates = async () => {
    const templates = await prisma.qcTemplate.findMany({
        include: {
            parameters: {
                include: {
                    parameter: true,
                }
            },
        },
    });

    return templates
}

export type QcTemplate = Awaited<ReturnType<typeof getAllQcTemplates>>[number];

export type QcTemplateParameter = Awaited<ReturnType<typeof getAllQcTemplates>>[number]["parameters"][number]

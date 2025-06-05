"use server"

import prisma from "@/lib/prisma"

export const getAllExaminationTypes = async () => {
    const types = await prisma.qcExaminationType.findMany();

    return types
}

export type ExaminationType = Awaited<ReturnType<typeof getAllExaminationTypes>>[number];

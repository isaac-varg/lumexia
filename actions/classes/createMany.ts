"use server"

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any

export const createMany = async (model: any, data: any) => {
    const results = await prismaInstance[model].createMany({
        data,
    });
    return results;
}
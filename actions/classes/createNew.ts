"use server"

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any

export const createNew = async (model: any, data: any) => {
    const results = await prismaInstance[model].create({
        data,
    });
    return results;
}
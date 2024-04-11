"use server"

import prisma from "@/lib/prisma";

const prismaInstance = prisma as any

export const getAll = async (model: any) => {
    const results = await prismaInstance[model].findMany();
    return results;
}
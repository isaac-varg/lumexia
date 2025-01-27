"use server"

import prisma from "@/lib/prisma"

export const getContainerTypes = async () => {

    const containers = await prisma.containerType.findMany();

    return containers 
}

export type Containers = Awaited<ReturnType<typeof getContainerTypes>>[number];

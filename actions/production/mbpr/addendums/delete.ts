"use server"

import prisma from "@/lib/prisma"

export const deleteAddendum = async (id: string) => {

    const response = await prisma.stepAddendum.delete({
        where: {
            id,
        }
    });

    return response
}




'use server'

import prisma from "@/lib/prisma"

export const getOnePaymentMethod = async (id: string) => {
    const method = await prisma.paymentMethod.findFirst({
        where: {
            id,
        }
    });

    return method;
};

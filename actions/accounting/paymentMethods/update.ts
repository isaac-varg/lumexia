'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const updatePaymentMethod = async (id: string, payload: Prisma.PaymentMethodUncheckedUpdateInput) => {
    const reponse = await prisma.paymentMethod.update({
        where: {
            id,
        },
        data: payload,
    });

    return reponse;
};

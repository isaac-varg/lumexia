'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createPaymentMethod = async (payload: Prisma.PaymentMethodUncheckedCreateInput) => {
    const reponse = await prisma.paymentMethod.create({
        data: payload,
    });

    return reponse
};

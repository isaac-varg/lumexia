'use server'

import prisma from "@/lib/prisma"

export const getAllPaymentMethods = async () => {
    const methods = await prisma.paymentMethod.findMany();

    return methods;
}

export type PaymentMethod = Awaited<ReturnType<typeof getAllPaymentMethods>>[number]


"use server"

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export const createAccountingAuditLog = async (data: Prisma.PoAccountingAuditLogUncheckedCreateInput) => {
    const res = await prisma.poAccountingAuditLog.create({
        data,
    });
    return res;
};


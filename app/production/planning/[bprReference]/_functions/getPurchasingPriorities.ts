"use server"

import prisma from "@/lib/prisma"
import { warn } from "console";

export const getPurchasingPriorities = async () => {
    const response = await prisma.requestPriority.findMany();

    return response;
}

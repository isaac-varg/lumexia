"use server"

import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"
import { Config } from "@prisma/client"

type ConfigGroup = keyof typeof staticRecords.app.appConfigGroups

export const getConfigByGroup = async (group: ConfigGroup) => {
    const configs = await prisma.config.findMany({
        where: {
            configGroupId: staticRecords.app.appConfigGroups[group]
        },
    })

    return configs
}



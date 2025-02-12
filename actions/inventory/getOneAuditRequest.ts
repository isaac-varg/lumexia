'use server'

import prisma from "@/lib/prisma"

export const getOneAuditRequest = async (id: string) => {

    const request = await prisma.auditRequest.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            item: true,
            requestedBy: true,
            notes: {
                include: {
                    noteType: true,
                    user: true
                }
            }
        }
    })


    return request
} 


export type AuditRequestSingle = Awaited<ReturnType<typeof getOneAuditRequest>>


export type AuditRequestNote = AuditRequestSingle['notes'][number]

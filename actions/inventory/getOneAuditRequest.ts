'use server'

import prisma from "@/lib/prisma"

export const getOneAuditRequest = async (requestId: string) => {

    const request = await prisma.auditRequest.findFirstOrThrow({
        where: {
            id: requestId,
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

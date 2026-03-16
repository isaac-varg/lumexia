'use server'

import { getFileUrl } from "@/actions/files/getUrl";
import { resolveNoteFiles } from "@/actions/notes/resolveNoteFiles";
import prisma from "@/lib/prisma"

export const getGeneralRequest = async (id: string) => {
    const request = await prisma.generalRequest.findFirstOrThrow({
        where: {
            id,
        },
        include: {
            user: true,
            GeneralRequestFile: {
                include: {
                    file: {
                        include: {
                            uploadedBy: true
                        }
                    },
                },
            },
            notes: {
                include: {
                    user: true,
                    noteType: true,
                    files: { include: { file: true } },
                }
            },
            status: true
        }
    });

    const transformedFiles = await Promise.all(request.GeneralRequestFile.map(async (file) => {

        const url = await getFileUrl(file.file.bucketName, file.file.objectName);

        return {
            ...file,
            url,
        }
    }));

    const { GeneralRequestFile, ...rest } = request;
    const notes = await resolveNoteFiles(rest.notes);

    const transformedRequest = {
        ...rest,
        notes,
        transformedFiles,
    }

    return transformedRequest;
}

export type GeneralRequest = Awaited<ReturnType<typeof getGeneralRequest>>

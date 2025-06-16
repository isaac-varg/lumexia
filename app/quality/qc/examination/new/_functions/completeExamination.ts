"use server"

import { ExaminationType } from "@/actions/quality/qc/examinationTypes/getAll"
import prisma from "@/lib/prisma"
import { IntermediateParameterResult } from "@/store/qcExaminationSlice"

export const completeExamination = async (recordId: string, parameterResults: IntermediateParameterResult[], examinationStatusId: string, examinationTypeId: string) => {

    // update record
    const record = await prisma.qcRecord.update({
        where: {
            id: recordId,
        },
        data: {
            statusId: examinationStatusId,
            examinationTypeId,
        }
    })

    // submit parameter results

    await Promise.all(parameterResults.map(async (p) => {

        const { parameterId, note, ...rest } = p
        const res = prisma.qcParameterResult.create({
            data: {
                qcRecordId: record.id,
                qcParameterId: p.parameterId,
                note: p.note || '',
                resultsData: {
                    ...rest
                }
            }
        })

        return res
    }))

}

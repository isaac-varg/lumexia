'use server'
import { getUserId } from "@/actions/users/getUserId"
import { qcRecordStatuses } from "@/configs/staticRecords/qcRecordStatuses"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { getAllExaminationTypes } from "../examinationTypes/getAll"

const inputDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  required: z.boolean(),
  value: z.string(),
})

const parameterResultSchema = z.object({
  parameterId: z.string(),
  parameterName: z.string(),
  itemParameterId: z.string(),
  value: z.string(),
  inputDefinitions: z.array(inputDefinitionSchema),
})

const importSchema = z.array(z.object({
  parameterResults: z.array(parameterResultSchema),
  examinationType: z.string(),
  lotNumber: z.string(),
}))


type ImportData = z.infer<typeof importSchema>

export const importQcRecords = async (data: ImportData) => {
  const validation = importSchema.safeParse(data)
  if (!validation.success) {
    return {
      success: false,
      message: "Invalid data format."
    }
  }

  const { data: validatedData } = validation
  const userId = await getUserId();
  const examinationTypes = await getAllExaminationTypes();
  const examinationTypesMap = new Map(examinationTypes.map(t => [t.name, t.id]))

  try {
    await prisma.$transaction(async (tx) => {
      for (const record of validatedData) {

        const examinationTypeId = examinationTypesMap.get(record.examinationType)

        if (!examinationTypeId) {
          throw new Error(`Invalid examination type: ${record.examinationType}`)
        }

        let examinedLot = await prisma.lot.findFirst({
          where: {
            lotNumber: record.lotNumber,
          }
        });

        if (!examinedLot) {
          throw new Error(`Lot ${record.lotNumber} not found.`);
        }

        const newQcRecord = await tx.qcRecord.create({
          data: {
            conductedById: userId,
            examinedLotId: examinedLot.id,
            examinationTypeId: examinationTypeId,
            statusId: qcRecordStatuses.pass,
          },
        })

        for (const paramResult of record.parameterResults) {
          const newParamResult = await tx.qcParameterResult.create({
            data: {
              qcRecordId: newQcRecord.id,
              qcParameterId: paramResult.parameterId,
              qcItemParameterId: paramResult.itemParameterId,
              value: paramResult.value,
            },
          })

          for (const inputDef of paramResult.inputDefinitions) {
            await tx.qcParameterInputResult.create({
              data: {
                qcResultId: newParamResult.id,
                parameterInputDefinitionId: inputDef.id,
                value: inputDef.value,
              },
            })
          }
        }
      }
    })
    return {
      success: true,
      message: "Import successful."
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message
    }
  }
}

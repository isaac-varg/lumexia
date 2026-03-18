'use server'
import { getUserId } from "@/actions/users/getUserId"
import { qcRecordStatuses } from "@/configs/staticRecords/qcRecordStatuses"
import prisma from "@/lib/prisma"
import { z } from "zod"

const inputDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  required: z.boolean(),
  value: z.string().nullable().transform(v => v ?? ''),
})

const parameterResultSchema = z.object({
  parameterId: z.string(),
  parameterName: z.string(),
  itemParameterId: z.string(),
  value: z.string().nullable().transform(v => v ?? ''),
  inputDefinitions: z.array(inputDefinitionSchema),
})

const bulkImportSchema = z.array(z.object({
  parameterResults: z.array(parameterResultSchema),
  examinationTypeId: z.string(),
  lotNumber: z.string(),
}))

type BulkImportData = z.infer<typeof bulkImportSchema>

export const bulkImportQcRecords = async (data: BulkImportData, itemId: string) => {
  const validation = bulkImportSchema.safeParse(data)
  if (!validation.success) {
    console.error("QC Bulk Import validation failed:", JSON.stringify(validation.error.flatten(), null, 2))
    return {
      success: false,
      message: "Invalid data format."
    }
  }

  const { data: validatedData } = validation
  const userId = await getUserId()

  const item = await prisma.item.findFirst({
    where: { id: itemId },
    select: { inventoryUomId: true }
  })

  if (!item) {
    return { success: false, message: "Item not found." }
  }

  try {
    await prisma.$transaction(async (tx) => {
      for (const record of validatedData) {
        let examinedLot = await tx.lot.findFirst({
          where: { lotNumber: record.lotNumber }
        })

        if (!examinedLot) {
          examinedLot = await tx.lot.create({
            data: {
              itemId,
              lotNumber: record.lotNumber,
              initialQuantity: 0,
              uomId: item.inventoryUomId,
            }
          })
          await tx.lotOrigin.create({
            data: {
              lotId: examinedLot.id,
              originType: 'manuallyCreated',
            }
          })
        }

        const newQcRecord = await tx.qcRecord.create({
          data: {
            conductedById: userId,
            examinedLotId: examinedLot.id,
            examinationTypeId: record.examinationTypeId,
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
    return { success: true, message: "Import successful." }
  } catch (error: any) {
    console.error(error)
    return { success: false, message: error.message }
  }
}

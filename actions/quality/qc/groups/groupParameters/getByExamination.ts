'use server'

import prisma from "@/lib/prisma"

export const getGroupParametersByExamination = async (examinationTypeId: string, itemId: string) => {
  const params = await prisma.qcGroupParameter.findMany({
    where: {
      group: {
        examinationTypeId,
      },
      parameter: {
        qcItemParameters: {
          some: {
            itemId,
          }
        }
      }
    },
    include: {
      parameter: {
        include: {
          qcItemParameters: {
            include: {
              parameter: {
                include: {
                  inputDefinitions: true
                }
              }
            }
          }
        }
      }
    }
  });

  return params;
}

export type ExaminationParameter = Awaited<ReturnType<typeof getGroupParametersByExamination>>[number]


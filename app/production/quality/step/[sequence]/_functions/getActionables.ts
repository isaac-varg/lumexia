import prisma from "@/lib/prisma"



export const getActionables = async (bprBatchStepId: string) => {

    const actionables = await prisma.bprStepActionable.findMany({
        where: {
            bprBatchStepId,
        },
        include: {
            bprBatchStep: true,
            stepActionable: {
                include: {
                    actionableType: {
                        include: {
                            userRole: true
                        }
                    },
                },
            },
            completion: {
                include: {
                    completedByUser: true
                }
            } 
        }
    })

    return actionables
}

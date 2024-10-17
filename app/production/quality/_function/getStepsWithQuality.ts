import { staticRecords } from "@/configs/staticRecords";
import prisma from "@/lib/prisma"

export const getStepsWithQuality = async (isSecondary: boolean) => {

    // first we need bprs with a compounding status
    const bprs = await getIncompleteBprs(isSecondary)


    return bprs

}



const getIncompleteBprs = async (isSecondary: boolean) => {

    const isVerified = isSecondary ? true : false
    const secondarySpread = isSecondary ? { verificationRequired: true } : { secondaryVerificationRequired: true };
    const statusId = isSecondary ? staticRecords.production.bprStepActionableStatuses.secondaryVerification : staticRecords.production.bprStepActionableStatuses.verify;

    // lol maybe do a sql query instead
    const bprs = await prisma.bprStepActionable.findMany({
        where: {
            AND: [
                { statusId },
                {
                    isCompounded: true,
                },
                {
                    isVerified,
                },
                {
                    stepActionable: {
                        ...secondarySpread
                    }
                }
            ]
        },
        include: {
            stepActionable: true,
            bprBatchStep: {
                include: {
                    batchStep: true,
                    bpr: {
                        include: {
                            status: true,
                            mbpr: {
                                include: {
                                    producesItem: true
                                }
                            }
                        }
                    }
                }
            },
            status: true,
            completion: true,
        }
    })
    return bprs
}



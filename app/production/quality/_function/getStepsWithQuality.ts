import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getStepsWithQuality = async () => {

    // first we need bprs with a compounding status
    const bprs = await getIncompleteBprs()


    console.log(JSON.stringify(bprs, null, 4));

    return bprs

}



const getIncompleteBprs = async () => {


    // lol maybe do a sql query instead
    const bprs = await prisma.bprStepActionable.findMany({
        where: {
            AND: [
                {
                    isCompounded: true,
                },
                {
                    isVerified: false,
                },
                {
                    stepActionable: {
                        verificationRequired: true
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
            BprStepActionableCompletion: true,
        }
    })
    return bprs
}



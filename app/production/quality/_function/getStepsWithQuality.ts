import { staticRecords } from "@/configs/staticRecords"
import prisma from "@/lib/prisma"

export const getStepsWithQuality = async () => {

    // first we need bprs with a compounding status
    const bprs = await getIncompleteBprs()
   
    console.log(bprs)

    return bprs

}



const getIncompleteBprs = async () => {

    const bprs = await prisma.batchProductionRecord.findMany({
        where: {
            AND: [
                {
                    bprStatusId: staticRecords.production.bprStatuses.compounding
                },
                {
                    bprBatchSteps: {
                        some: {
                            isComplete: false,
                        }
                    }
                }
            ]
        }
    })
    return bprs
}



'use server'

import { getUserId } from "@/actions/users/getUserId"
import prisma from "@/lib/prisma"


export const createGeneralRequest = async () => {
    const userId = await getUserId()
    const res = await prisma.generalRequest.create({
        data: {
            statusId: 'ac412826-a79f-439c-9558-196c910a638b',
            title: 'temporary / draft general request',
            userId,
        }
    });

    return res;
}

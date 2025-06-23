"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const getUser = async () => {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        redirect('/api/auth/signin')
    }

    const user = await prisma.user.findFirstOrThrow({
        where: {
            email: session.user.email,
        },
        include: {
            UserRoleAssignment: {
                include: {
                    userRole: true,
                }
            }
        },
    })


    return user;
};

export type User = Awaited<ReturnType<typeof getUser>>

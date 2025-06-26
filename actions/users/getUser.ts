"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { staticRecords } from "@/configs/staticRecords";

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
    });

    // some transformations for easier use

    const isPurchasing = user &&
        user.UserRoleAssignment.length > 0 &&
        user.UserRoleAssignment.some(r => r.userRoleId === staticRecords.app.userRoles.purchasing)




    return {
        ...user,
        roles: {
            isPurchasing,
        }
    };
};

export type User = Awaited<ReturnType<typeof getUser>>

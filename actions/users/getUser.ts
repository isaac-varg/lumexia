"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { staticRecords } from "@/configs/staticRecords";
import { userRoles } from "@/configs/staticRecords/userRoles";

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
    user.UserRoleAssignment.some(r => r.userRoleId === userRoles.purchasing)

  const isProduction = user && user.UserRoleAssignment.length > 0 &&
    user.UserRoleAssignment.some(r => r.userRoleId === userRoles.production)

  const isProductionQuality = user && user.UserRoleAssignment.length > 0 &&
    user.UserRoleAssignment.some(r => r.userRoleId === userRoles.productionQuality)

  const isProductionQualitySecondary = user && user.UserRoleAssignment.length > 0 &&
    user.UserRoleAssignment.some(r => r.userRoleId === userRoles.productionQualitySecondary)



  return {
    ...user,
    roles: {
      isPurchasing,
      isProduction,
      isProductionQuality,
      isProductionQualitySecondary,
    }
  };
};

export type User = Awaited<ReturnType<typeof getUser>>

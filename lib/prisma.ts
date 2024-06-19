/*
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
*/

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.ENVIRONMENT !== 'production') globalThis.prismaGlobal = prisma

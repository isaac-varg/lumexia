import stagingTransactions from "../../input/staging"
import prisma from "@/lib/prisma"

export const createTransactions = async ( ) => {

  try {
    await prisma.transaction.createMany({
      data: stagingTransactions
    })
  } catch (error) {
    console.error("Something went wrong.") 
  } finally {
    console.log('Successfully imported staged scans as transactions.')
  }
}


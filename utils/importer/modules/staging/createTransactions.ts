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


export const createTransactionsIndividually = async () => {

   stagingTransactions.forEach( async (transaction) => {
      
    try {
     
      await prisma.transaction.create({
        data: transaction
      })

      console.log(`Success importing <${transaction.amount}> of '${transaction.lotId}' `)
      
    } catch (error) {
      console.error(`FAILED --> <${transaction.amount}> of '${transaction.lotId}' `) 
    }
  })


  console.log('Finished.')


  
}



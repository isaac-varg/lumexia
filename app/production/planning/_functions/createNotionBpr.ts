"use server"

import notion from "@/lib/notion"
import prisma from "@/lib/prisma"

export const initiateNotionBpr = async (bprId: string) => {
  const response = await prisma.config.findUniqueOrThrow({
    where: {
      id: 'staticRecords.configs.isProductionNotionEnabled'
    }
  })

  const enabled = response.value.toLowerCase() === "true";

  if (enabled) {
    createNotionBpr(bprId);
  }

}

export const createNotionBpr = async (bprId: string) => {

  const bpr = await prisma.batchProductionRecord.findUniqueOrThrow({
    where: {
      id: bprId,
    },
    include: {
      mbpr: {
        include: {
          producesItem: true
        }
      },
      batchSize: true
    }
  })
  const dbId = process.env.NOTION_PRODUCTION_DB_ID

  if (!dbId) { throw new Error("Environment variable for production DB not found.") }

  const xx = await notion.databases.retrieve({ database_id: dbId })

  console.log(JSON.stringify(xx, null, 2))

  const page = await notion.pages.create({
    parent: {
      type: 'database_id',
      database_id: dbId,
    },
    properties: {
      "title": {
        "title": [
          {
            "text": {
              "content": `${bpr.mbpr.producesItem.name} <${bpr.referenceCode}>`
            }
          }
        ]
      },
      "Status": {
        type: 'status',
        status: {
          name: 'Draft'
        }
      },
      "Batch Size (lbs)": {
        number: bpr.batchSize.quantity
      }
    }
  })

  createNotionSync(bpr.id, page.id)
}

const createNotionSync = async (bprId: string, notionPageId: string) => {

  const response = await prisma.notionBpr.create({
    data: {
      lumexiaBprId: bprId,
      notionPageId,
    }
  });

}









"use server"

import { staticRecords } from "@/configs/staticRecords"
import notion from "@/lib/notion";
import prisma from "@/lib/prisma"

export const createNotionNotification = async (bprReferenceCode: string, producedItemName: string) => {

    const recipient = await prisma.userRoleAssignment.findFirstOrThrow({
        where: {
            userRoleId: staticRecords.app.userRoles.purchasing,
        },
        include: {
            user: {
                include: {
                    userConfigs: true,
                }
            }
        }
    });

const notionId = recipient.user.userConfigs.filter((c) => c.name === 'userId')[0].value

    if (!recipient || !notionId) {
        throw new Error("No Recipient for the notification")
    }


    await notion.pages.create({
        "icon": {
            "type": "emoji",
            "emoji": "🥬"
        },
        "parent": {
            "type": "database_id",
            "database_id": process.env.NOTION_NOTIFICITION_DB_ID || ''
        },
        "properties": {
            "Title": {
                "title": [
                    {
                        "text": {
                            "content": `BPR #${bprReferenceCode} for ${producedItemName} was added to Lumexia`,
                        }
                    }
                ]
            },
            "Recipient": {
                "people": [{
                    "object": "user",
                    "id": notionId, 
                }]
            }
        },
    })



}

"use server"

import bprActions from "@/actions/production/bprActions";
import { staticRecords } from "@/configs/staticRecords";
import notion from "@/lib/notion";
import prisma from "@/lib/prisma";
import { IBpr } from "@/types/batchProductionRecord";
import { BprStatus } from "@/types/bprStatus";
import { NotionPage } from "@/types/notionPage";
import { TextUtils } from "@/utils/text";
import { DateTime } from "luxon";

interface ISyncBpr extends IBpr {
    status: BprStatus
}

export const handleSync = async (bprId: string, notionPageId: string) => {

    const bpr = await prisma.batchProductionRecord.findFirstOrThrow({
        where: {
            id: bprId,
        },
        include: {
            status: true
        }
    });

    const page = await notion.pages.retrieve({
        page_id: notionPageId,
    }) as NotionPage;


    const notionLastEdited = DateTime.fromISO(page.last_edited_time);
    const lumexiaLastEdited = DateTime.fromJSDate(bpr.updatedAt);

    const isNotionMoreRecent = notionLastEdited > lumexiaLastEdited;

    if (isNotionMoreRecent) {
        const response = await updateLumexia(page, bpr);
        return response

    }

    const response = await updateNotion(page, bpr);
    return response


}

const updateLumexia = async (page: NotionPage | any, bpr: ISyncBpr) => {

    const lumexiaStatuses = staticRecords.production.bprStatuses

    const status: keyof typeof lumexiaStatuses = TextUtils.camelCase(page.properties.Status.status.name) as any

    const lumexiaStatus = staticRecords.production.bprStatuses[status]

    try {
        await bprActions.update({ id: bpr.id }, {
            bprStatusId: lumexiaStatus,
        })


        return JSON.stringify(`Updated Notion -> Lumexia`)
    } catch (error) {
        return new Error("There was an error with this sync.")
    }



}

const updateNotion = async (page: NotionPage | any, bpr: ISyncBpr) => {


    let notionStatus = TextUtils.properCase(bpr.status.name)

    // 😮
    if (notionStatus === 'Verifying Bom Fulfillment') {
        notionStatus = 'Verifying BOM Fulfillment'
    }

    try {
        await notion.pages.update({
            page_id: page.id,
            properties: {
                Status: {
                    status: {
                        name: notionStatus 
                    }
                }
            }
        })

        return JSON.stringify(`Updated Lumexia -> Notion`)
    } catch (error) {

        return new Error("There was an error with this sync.")
    }
}



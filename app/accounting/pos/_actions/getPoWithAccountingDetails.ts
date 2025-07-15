'use server'

import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"

// reusable type for the data structure
const poWithAccountingDetailsArgs = Prisma.validator<Prisma.PurchaseOrderDefaultArgs>()({
    include: {
        poAccountingDetail: {
            include: {
                status: true,
                paymentMethod: true,
            }
        },
        supplier: true,
        status: true,
        purchaseOrderItems: true,
        poAccountingFiles: {
            include: {
                fileType: true
            }
        },
        poAccountingNotes: {
            include: {
                user: true,
                noteType: true
            }
        }
    }
});

// type for a single PO with all its relations
type PoWithAccountingDetails = Prisma.PurchaseOrderGetPayload<typeof poWithAccountingDetailsArgs> & { total: number };

// function to add the 'total'
const addTotalToPo = (po: Prisma.PurchaseOrderGetPayload<typeof poWithAccountingDetailsArgs>): PoWithAccountingDetails => {
    const total = po.purchaseOrderItems.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.pricePerUnit)
    }, 0);
    return { ...po, total };
}

// overload signatures
export function getPoWithAccountingDetails(id: string): Promise<PoWithAccountingDetails | null>;
export function getPoWithAccountingDetails(): Promise<PoWithAccountingDetails[]>;

export async function getPoWithAccountingDetails(id?: string): Promise<PoWithAccountingDetails | PoWithAccountingDetails[] | null> {
    if (id) {
        const po = await prisma.purchaseOrder.findUnique({
            where: { id },
            ...poWithAccountingDetailsArgs
        });

        if (!po) return null;
        return addTotalToPo(po);
    } else {
        const pos = await prisma.purchaseOrder.findMany({
            ...poWithAccountingDetailsArgs
        });
        return pos.map(addTotalToPo);
    }
};

export type PoWithAccounting = PoWithAccountingDetails;

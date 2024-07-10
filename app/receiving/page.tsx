import purchaseOrderActions from "@/actions/purchasing/purchaseOrderActions";
import purchaseOrderStatusActions from "@/actions/purchasing/purchaseOrderStatusActions";
import React from "react";
import AwaitingDeliveryTable from "./_components/AwaitingDeliveryTable";
import prisma from "@/lib/prisma";
import PageTitle from "@/components/Text/PageTitle";
import Card from "@/components/Card";
import { PurchaseOrderStatus } from "@/types/purchaseOrderStatus";
import RecentlyCompletedTable from "./_components/RecentlyCompletedTable";

const ReceivingPage = async () => {
  const statuses: PurchaseOrderStatus[] =
    await purchaseOrderStatusActions.getAll();

  const awaitingDeliveryStatus =
    statuses[statuses.findIndex((status) => status.sequence === 3)];
  const partialDeliveryStatus =
    statuses[statuses.findIndex((status) => status.sequence === 5)];
  const receivedDeliveryStatus =
    statuses[statuses.findIndex((status) => status.sequence === 4)];

  const awaitingDeliveryPOs = await prisma.purchaseOrder.findMany({
    where: {
      OR: [
        { statusId: { equals: partialDeliveryStatus.id } },
        { statusId: { equals: awaitingDeliveryStatus.id } },
      ],
    },
    include: {
      supplier: true,
      status: true,
    },
  });

  const recentlyDelived = await prisma.purchaseOrder.findMany({
    where: {
      statusId: receivedDeliveryStatus.id,
    },
    include: {
      supplier: true,
      status: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle>Receivables</PageTitle>

      <Card.Root>
        <Card.Title size="small">Awaiting Delivery</Card.Title>
        <AwaitingDeliveryTable purchaseOrders={awaitingDeliveryPOs} />
      </Card.Root>

      <Card.Root>
        <Card.Title size="small">Recently Completed</Card.Title>

        <RecentlyCompletedTable purchaseOrders={recentlyDelived} />
      </Card.Root>
    </div>
  );
};

export default ReceivingPage;

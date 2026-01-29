import React from "react";
import PageTitle from "@/components/Text/PageTitle";
import { inventoryActions } from "@/actions/inventory";
import DiscrepancyButton from "./_components/DiscrepancyButton";
import AuditTabs from "./_components/AuditTabs";

const ScanPage = async () => {

  const requests = await inventoryActions.auditReqests.getAll();
  const completedRequests = await inventoryActions.auditReqests.getAllCompleted();

  return (
    <div className='flex flex-col gap-y-6'>
      <div className="flex justify-between">
        <PageTitle>Inventory Audit</PageTitle>

        <div className="flex gap-x-2">
          <DiscrepancyButton />
        </div>

      </div>

      <AuditTabs requests={requests} completedRequests={completedRequests} />

    </div>
  );
};

export default ScanPage;

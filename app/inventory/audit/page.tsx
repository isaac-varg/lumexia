import React from "react";
import ScanPanel from "./_components/ScanPanel";
import PageTitle from "@/components/Text/PageTitle";
import RequestsPanel from "./_components/RequestsPanel";
import { inventoryActions } from "@/actions/inventory";
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import Layout from "@/components/Layout";
import RecentAuditsPanel from "./_components/RecentAuditsPanel";
import DiscrepancyButton from "./_components/DiscrepancyButton";

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

      <ScanPanel />

      <Layout.Grid cols={2} gap={6} >

        <RequestsPanel requests={requests} />

        <RecentAuditsPanel audits={completedRequests} />


      </Layout.Grid>

    </div>
  );
};

export default ScanPage;

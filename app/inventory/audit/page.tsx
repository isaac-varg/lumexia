import React from "react";
import ScanPanel from "./_components/ScanPanel";
import PageTitle from "@/components/Text/PageTitle";
import RequestsPanel from "./_components/RequestsPanel";
import { inventoryActions } from "@/actions/inventory";
import PageBreadcrumbs from "@/components/App/PageBreadcrumbs";
import Layout from "@/components/Layout";
import RecentAuditsPanel from "./_components/RecentAuditsPanel";

const ScanPage = async () => {


    const requests = await inventoryActions.auditReqests.getAll();
    const completedRequests = await inventoryActions.auditReqests.getAllCompleted();

    return (
        <div className='flex flex-col gap-y-6'>
            <PageTitle>Inventory Audit</PageTitle>

            <ScanPanel />

            <Layout.Grid cols={2} >

                <RequestsPanel requests={requests} />

                <RecentAuditsPanel audits={completedRequests} />


            </Layout.Grid>

        </div>
    );
};

export default ScanPage;

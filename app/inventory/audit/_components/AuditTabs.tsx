"use client";

import { Tabs } from "@/components/Tabs2";
import { AuditRequest } from "@/actions/inventory/getAuditRequests";
import { CompletedAudit } from "@/actions/inventory/auditRequests/getAllCompleted";
import ScanPanel from "./ScanPanel";
import RequestsPanel from "./RequestsPanel";
import RecentAuditsPanel from "./RecentAuditsPanel";
import AuditsTable from "./AuditsTable";
import Layout from "@/components/Layout";

const AuditTabs = ({ requests, completedRequests }: { requests: AuditRequest[], completedRequests: CompletedAudit[] }) => {
  return (
    <Tabs.Root defaultValue="open">
      <Tabs.List>
        <Tabs.Trigger size="large" value="open">Open</Tabs.Trigger>
        <Tabs.Trigger size="large" value="archive">Archive</Tabs.Trigger>
      </Tabs.List>

      <Tabs.ContentContainer>
        <Tabs.Content value="open">
          <div className="flex flex-col gap-y-6">
            <ScanPanel />

            <Layout.Grid cols={2} gap={6}>
              <RequestsPanel requests={requests} />
              <RecentAuditsPanel audits={completedRequests} />
            </Layout.Grid>
          </div>
        </Tabs.Content>

        <Tabs.Content value="archive">
          <AuditsTable audits={completedRequests} />
        </Tabs.Content>
      </Tabs.ContentContainer>
    </Tabs.Root>
  );
};

export default AuditTabs;

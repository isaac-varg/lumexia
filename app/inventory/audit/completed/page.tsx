import React from "react";
import PageTitle from "@/components/Text/PageTitle";
import SectionTitle from "@/components/Text/SectionTitle";
import { getOneCompletedAuditRequest } from "@/actions/inventory/auditRequests/getOneCompleted";
import AuditDetails from "./_components/AuditDetails";
import TransactionsTable from "./_components/TransactionsTable";
import Card from "@/components/Card";
import { DateTime } from "luxon";
import { dateFormatWithTime } from "@/configs/data/dateFormatString";

type PageProps = {
  searchParams: {
    id: string;
  };
};

const CompletedAuditPage = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;
  const audit = await getOneCompletedAuditRequest(id);

  return (
    <div className="flex flex-col gap-y-6">
      <PageTitle>Audit Details - {audit.item.name}</PageTitle>

      <div className="flex flex-col gap-2">
        <SectionTitle>Details</SectionTitle>
        <AuditDetails audit={audit} />
      </div>

      <div className="flex flex-col gap-2">
        <SectionTitle>Transactions</SectionTitle>
        <TransactionsTable transactions={audit.inventoryAudit?.transactions ?? []} />
      </div>

      {audit.notes.length > 0 && (
        <div className="flex flex-col gap-2">
          <SectionTitle>Notes</SectionTitle>
          <Card.Root>
            <div className="flex flex-col gap-3">
              {audit.notes.map((note) => (
                <div key={note.id} className="flex flex-col gap-1 border-b border-zinc-800 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium font-poppins">{note.user.name}</span>
                    <span className="text-xs text-zinc-400 font-poppins">
                      {DateTime.fromJSDate(note.createdAt).toFormat(dateFormatWithTime)}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 font-poppins">{note.content}</p>
                </div>
              ))}
            </div>
          </Card.Root>
        </div>
      )}
    </div>
  );
};

export default CompletedAuditPage;

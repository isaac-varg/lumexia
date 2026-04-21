"use client"

import Alert from "@/components/Alert"
import useDialog from "@/hooks/useDialog"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { accountingActions } from "@/actions/accounting"
import { getUserId } from "@/actions/users/getUserId"
import { pricingExaminationNoteTypes } from "@/configs/staticRecords/pricingExaminationNoteTypes"
import { ZeroCostBomItem } from "../_actions/detectZeroCostBomItems"

type Props = {
  affectedItems: ZeroCostBomItem[];
  examId: string;
  itemId: string;
};

const DIALOG_IDENTIFIER = "zeroCostBomAlert";

const buildNoteContent = (affectedItems: ZeroCostBomItem[]): string => {
  const itemSummaries = affectedItems.map((item) => {
    const fields = item.fields.map((f) => f.label).join(", ");
    return `${item.name} (${fields})`;
  });

  return `[System] Zero-cost BOM alert acknowledged. The following BOM items had zero or null cost fields: ${itemSummaries.join("; ")}.`;
};

const ZeroCostBomAlert = ({ affectedItems, examId, itemId }: Props) => {
  const { showDialog } = useDialog();
  const router = useRouter();

  useEffect(() => {
    showDialog(DIALOG_IDENTIFIER);
  }, [showDialog]);

  const handleAcknowledge = async () => {
    const userId = await getUserId();

    await accountingActions.examinations.notes.create(
      {
        userId,
        pricingExaminationId: examId,
        noteTypeId: pricingExaminationNoteTypes.system,
        content: buildNoteContent(affectedItems),
      },
      {
        examinationId: examId,
        examinedItemId: itemId,
      }
    );

    router.refresh();
  };

  return (
    <Alert.Root identifier={DIALOG_IDENTIFIER}>
      <Alert.Content
        title="Zero-Cost BOM Items Detected"
        action={handleAcknowledge}
        actionLabel="Acknowledge"
        actionColor="warning"
      >
        <div className="flex flex-col gap-2">
          <p>
            The following BOM items have one or more cost fields that are zero or
            null. This may affect pricing accuracy.
          </p>
          <ul className="list-disc pl-5 text-sm">
            {affectedItems.map((item) => (
              <li key={item.name}>
                <span className="font-medium">{item.name}</span>
                {" — "}
                {item.fields.map((f) => f.label).join(", ")}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-1">
            Acknowledging this alert will add a note to the examination record.
          </p>
        </div>
      </Alert.Content>
    </Alert.Root>
  );
};

export default ZeroCostBomAlert;

import { Table } from "@tanstack/react-table";
import ActionButton from "../ActionButton";

export const FooterCell = ({ table }: any) => {
    const meta = table.options.meta

    const handleKeydown = (event: any) => {
      if (event.key === "c") {
        meta?.addRow();
      }
    };
    return (
      <div className="mt-6">
        <ActionButton onKeyDown={handleKeydown} className="font-poppins font-semibold text-xl text-slate-900" onClick={meta?.addRow}>
          Add Item (Ctrl + C)
        </ActionButton>
      </div>
    )
  }


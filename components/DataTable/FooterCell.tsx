import { Table } from "@tanstack/react-table";

export const FooterCell = ({ table }: any) => {
    const meta = table.options.meta

    const handleKeydown = (event: any) => {
      console.log(event)
      if (event.key === "c") {
        meta?.addRow();
      }
    };
    return (
      <div className="mt-6">
        <button onKeyDown={handleKeydown} className="font-poppins font-semibold text-xl text-slate-900" onClick={meta?.addRow}>
          Add Item (Ctrl + C)
        </button>
      </div>
    )
  }


import { Table } from "@tanstack/react-table";

export const FooterCell = ({ table }: any) => {
    const meta = table.options.meta
    return (
      <div className="footer-buttons">
        <button className="add-button" onClick={meta?.addRow}>
          Add New +
        </button>
      </div>
    )
  }


import { TbPencil, TbCheck, TbX } from "react-icons/tb";

export const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const setEditedRows = (e: any) => {
    e.stopPropagation();
    const elementName = e.currentTarget.name;

    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));

    if (elementName !== "edit") {
      meta?.revertData(row.index, elementName === "cancel");
    }
  };

  const removeRow = (e: any) => {
    e.stopPropagation();
    meta?.removeRow(row.index);
  };

  return meta?.editedRows[row.id] ? (
    <>
      <button name="cancel" onClick={setEditedRows}>
        <TbX />
      </button>{" "}
      <button name="done" onClick={setEditedRows}>
        <TbCheck />
      </button>
    </>
  ) : (
    <>
      <button name="edit" onClick={setEditedRows}>
        <TbPencil />
      </button>
      <button onClick={removeRow} name="remove">
        <TbX className="text-rose-400" />
      </button>
    </>
  );
};

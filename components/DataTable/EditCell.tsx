import { TbPencil, TbCheck, TbX } from "react-icons/tb";


const classes = {
  button: 'p-1 rounded-lg bg-cararra-200 hover:bg-cararra-300 text-2xl'
}

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
    <div className="flex gap-x-2">
<button className={`${classes.button}`}  name="done" onClick={setEditedRows}>
        <TbCheck className="text-2xl text-bay-leaf-500" />
      </button>
      <button className={`${classes.button}`} name="cancel" onClick={setEditedRows}>
        <TbX className="text-2xl text-rose-500"/>
      </button>      
    </div>
  ) : (
    <div className="flex gap-x-2">
      <button className={`${classes.button}`} name="edit" onClick={setEditedRows}>
        <TbPencil />
      </button>
      <button className={`${classes.button}`} onClick={removeRow} name="remove">
        <TbX className="text-rose-500" />
      </button>
    </div>
  );
};

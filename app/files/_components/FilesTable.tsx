'use client'
import { useCallback, useMemo, useState } from "react";
import DataTable from "@/components/DataTable";
import { UnifiedFileEntry } from "../_actions/getAllFiles";
import { getFileColumns } from "./fileColumns";
import { MODULE_OPTIONS, EXTENSION_OPTIONS } from "./FileFilters";
import { toTableFilter } from "@/utils/data/toTableFilter";
import { Filter } from "@/types/filter";
import FilesBulkActionBar from "./FilesBulkActionBar";

const FilesTable = ({ entries }: { entries: UnifiedFileEntry[] }) => {
  const [selected, setSelected] = useState<UnifiedFileEntry[]>([]);
  const [selectionKey, setSelectionKey] = useState(0);
  const columns = useMemo(() => getFileColumns(), []);

  const handleSelectionChange = useCallback((rows: UnifiedFileEntry[]) => {
    setSelected(rows);
  }, []);

  const handleClear = useCallback(() => {
    setSelected([]);
    setSelectionKey((k) => k + 1);
  }, []);

  const filters: Filter[] = useMemo(() => [
    {
      columnName: "module",
      filterLabel: "Module",
      options: MODULE_OPTIONS,
    },
    {
      columnName: "fileType",
      filterLabel: "File Type",
      options: toTableFilter(
        entries.filter((e) => e.fileType),
        (e) => `${e.module}::${e.fileType!.name}`,
        (e) => `${e.fileType!.name} (${e.module})`
      ),
    },
    {
      columnName: "extension",
      filterLabel: "Extension",
      options: EXTENSION_OPTIONS,
    },
    {
      columnName: "tags",
      filterLabel: "Tags",
      options: toTableFilter(
        entries.flatMap((e) => e.tags),
        (t) => t.id,
        (t) => t.name
      ),
    },
    {
      columnName: "uploadedBy",
      filterLabel: "Uploaded By",
      options: toTableFilter(
        entries,
        (e) => e.uploadedBy.name ?? undefined,
        (e) => e.uploadedBy.name ?? undefined
      ),
    },
    {
      columnName: "public",
      filterLabel: "Public",
      options: [
        { value: true, label: "Public" },
        { value: false, label: "Private" },
      ],
    },
  ], [entries]);

  return (
    <div className="flex flex-col gap-y-4">
      <FilesBulkActionBar
        selected={selected}
        onClear={handleClear}
      />
      <DataTable.Default
        key={selectionKey}
        data={entries}
        columns={columns}
        filters={filters}
        tableStateName="files"
        initialSortBy={[{ id: "createdAt", desc: true }]}
        selectable
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};

export default FilesTable;

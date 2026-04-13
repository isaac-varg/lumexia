'use client'
import { useState } from "react";
import { UnifiedFileEntry, FileModule } from "../_actions/getAllFiles";
import FileCard from "./FileCard";
import FileFilters, { ExtensionFilter, MODULE_OPTIONS } from "./FileFilters";
import Searcher from "@/components/Search/Searcher";

function getExtType(mimeType: string): ExtensionFilter {
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType.startsWith("image/")) return "image";
  return "other";
}

const SEARCH_KEYS = ["name", "module", "fileType.name", "uploadedBy.name"];

const DEFAULT_MODULES = new Set<FileModule>(
  MODULE_OPTIONS.map((m) => m.value).filter((v) => v !== "bpr-staging")
);

const FilesView = ({ entries }: { entries: UnifiedFileEntry[] }) => {
  const [searchResults, setSearchResults] = useState<UnifiedFileEntry[]>(entries);
  const [selectedModules, setSelectedModules] = useState<Set<FileModule>>(DEFAULT_MODULES);
  const [selectedFileTypes, setSelectedFileTypes] = useState<Set<string>>(new Set());
  const [selectedExtensions, setSelectedExtensions] = useState<Set<ExtensionFilter>>(new Set());

  const toggle = <T extends string>(set: Set<T>, value: T): Set<T> => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const visible = searchResults.filter((entry) => {
    if (selectedModules.size > 0 && !selectedModules.has(entry.module)) return false;

    if (selectedFileTypes.size > 0) {
      const key = `${entry.module}::${entry.fileType?.name ?? ""}`;
      if (!selectedFileTypes.has(key)) return false;
    }

    if (selectedExtensions.size > 0 && !selectedExtensions.has(getExtType(entry.mimeType))) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-y-6">
      <Searcher data={entries} keys={SEARCH_KEYS} onQueryComplete={setSearchResults} />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <FileFilters
          entries={entries}
          selectedModules={selectedModules}
          selectedFileTypes={selectedFileTypes}
          selectedExtensions={selectedExtensions}
          onModuleChange={(v) => setSelectedModules(toggle(selectedModules, v))}
          onFileTypeChange={(v) => setSelectedFileTypes(toggle(selectedFileTypes, v))}
          onExtensionChange={(v) => setSelectedExtensions(toggle(selectedExtensions, v))}
        />
        <span className="text-sm font-poppins text-base-content/60">
          {visible.length} of {entries.length} files
        </span>
      </div>

      {visible.length === 0 ? (
        <div className="flex items-center justify-center py-24 text-base-content/40 font-poppins text-lg">
          No files match the search or filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((entry) => (
            <FileCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesView;

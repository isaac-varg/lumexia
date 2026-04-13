'use client'
import * as Popover from "@radix-ui/react-popover";
import * as Separator from "@radix-ui/react-separator";
import { RxCheck, RxPlus } from "react-icons/rx";
import { UnifiedFileEntry, FileModule } from "../_actions/getAllFiles";

export type ExtensionFilter = "pdf" | "image" | "other";

export const MODULE_OPTIONS: { value: FileModule; label: string }[] = [
  { value: "item", label: "Items" },
  { value: "po-accounting", label: "PO Accounting" },
  { value: "qc-record", label: "QC Record" },
  { value: "bpr-staging", label: "BPR Staging" },
  { value: "general-request", label: "General Request" },
  { value: "note", label: "Note Attachment" },
  { value: "unassigned", label: "Unassigned" },
];

export const EXTENSION_OPTIONS: { value: ExtensionFilter; label: string }[] = [
  { value: "pdf", label: "PDF" },
  { value: "image", label: "Image" },
  { value: "other", label: "Other" },
];

type FilterOption = { value: string; label: string; bgColor?: string; textColor?: string };

function FilterPopover({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: FilterOption[];
  selected: Set<string>;
  onChange: (value: string) => void;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="flex items-center text-normal font-poppins font-medium px-2 py-2 border-2 border-dotted border-accent/35 rounded-lg">
          <RxPlus className="mr-2 h-4 w-4" />
          {title}
          {selected.size > 0 && (
            <>
              <Separator.Root className="bg-accent mx-2 w-px h-6" orientation="vertical" />
              <div className="hidden space-x-1 lg:flex">
                {selected.size > 2 ? (
                  <span className="rounded-sm px-1 font-normal">{selected.size} selected</span>
                ) : (
                  options
                    .filter((o) => selected.has(o.value))
                    .map((o) => (
                      <span key={o.value} className="bg-accent px-2 font-normal rounded-lg">
                        {o.label.length > 20 ? `${o.label.slice(0, 20)}...` : o.label}
                      </span>
                    ))
                )}
              </div>
            </>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded-xl bg-base-200 z-50 shadow-lg">
          <div className="flex flex-col gap-y-1 max-h-60 overflow-auto p-1">
            {options.map((option) => {
              const isSelected = selected.has(option.value);
              return (
                <button
                  key={option.value}
                  className="font-inter text-sm text-accent-content px-2 py-1 bg-accent/25 rounded-lg"
                  onClick={() => onChange(option.value)}
                >
                  <div className="flex flex-row items-center">
                    <div
                      className={`mr-2 flex h-4 w-4 items-center justify-center rounded-lg border border-accent ${
                        isSelected
                          ? "bg-accent text-accent-content"
                          : "bg-accent opacity-50 [&_svg]:invisible"
                      }`}
                    >
                      <RxCheck />
                    </div>
                    {option.bgColor && option.textColor ? (
                      <span
                        className="rounded-md px-1 text-xs font-medium uppercase mr-1"
                        style={{ backgroundColor: option.bgColor, color: option.textColor }}
                      >
                        {option.label.length > 25 ? `${option.label.slice(0, 25)}...` : option.label}
                      </span>
                    ) : (
                      <span>
                        {option.label.length > 25 ? `${option.label.slice(0, 25)}...` : option.label}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

type FileFiltersProps = {
  entries: UnifiedFileEntry[];
  selectedModules: Set<FileModule>;
  selectedFileTypes: Set<string>;
  selectedExtensions: Set<ExtensionFilter>;
  onModuleChange: (value: FileModule) => void;
  onFileTypeChange: (value: string) => void;
  onExtensionChange: (value: ExtensionFilter) => void;
};

const FileFilters = ({
  entries,
  selectedModules,
  selectedFileTypes,
  selectedExtensions,
  onModuleChange,
  onFileTypeChange,
  onExtensionChange,
}: FileFiltersProps) => {
  // Build unique fileType options from the data, tagged with module
  const fileTypeMap = new Map<string, FilterOption>();
  for (const entry of entries) {
    if (!entry.fileType) continue;
    const key = `${entry.module}::${entry.fileType.name}`;
    if (!fileTypeMap.has(key)) {
      const moduleLabel = MODULE_OPTIONS.find((m) => m.value === entry.module)?.label ?? entry.module;
      fileTypeMap.set(key, {
        value: key,
        label: `${entry.fileType.name} (${moduleLabel})`,
        bgColor: entry.fileType.bgColor,
        textColor: entry.fileType.textColor,
      });
    }
  }
  const fileTypeOptions = Array.from(fileTypeMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  return (
    <div className="flex flex-wrap gap-3">
      <FilterPopover
        title="Module"
        options={MODULE_OPTIONS}
        selected={selectedModules as Set<string>}
        onChange={(v) => onModuleChange(v as FileModule)}
      />
      {fileTypeOptions.length > 0 && (
        <FilterPopover
          title="File Type"
          options={fileTypeOptions}
          selected={selectedFileTypes}
          onChange={onFileTypeChange}
        />
      )}
      <FilterPopover
        title="Extension"
        options={EXTENSION_OPTIONS}
        selected={selectedExtensions as Set<string>}
        onChange={(v) => onExtensionChange(v as ExtensionFilter)}
      />
    </div>
  );
};

export default FileFilters;

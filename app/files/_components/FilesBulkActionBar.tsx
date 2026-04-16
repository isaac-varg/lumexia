'use client'
import { useEffect, useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HexColorPicker } from "react-colorful"
import Tag from "@/components/Text/Tag"
import Dialog from "@/components/Dialog"
import useDialog from "@/hooks/useDialog"
import { UnifiedFileEntry, TagInfo } from "../_actions/getAllFiles"
import { getAllTags, TagOption } from "../[fileId]/_actions/getAllTags"
import { bulkAddTag } from "../_actions/bulkAddTag"
import { bulkRemoveTag } from "../_actions/bulkRemoveTag"
import { bulkSetPublic } from "../_actions/bulkSetPublic"

type Props = {
  selected: UnifiedFileEntry[];
  onClear: () => void;
};

const FilesBulkActionBar = ({ selected, onClear }: Props) => {
  const router = useRouter();
  const { showDialog, resetDialogContext } = useDialog();
  const [isPending, startTransition] = useTransition();

  const sharedTags = useMemo(() => {
    if (selected.length === 0) return [];
    const first = selected[0].tags.map((t) => t.id);
    return selected[0].tags.filter((t) =>
      selected.every((entry) => entry.tags.some((et) => et.id === t.id))
    );
  }, [selected]);

  const existingTagIds = useMemo(() => {
    const ids = new Set<string>();
    selected.forEach((entry) => entry.tags.forEach((t) => ids.add(t.id)));
    return Array.from(ids);
  }, [selected]);

  const fileIds = useMemo(() => selected.map((s) => s.id), [selected]);

  const handleMakePublic = () => {
    startTransition(async () => {
      await bulkSetPublic(fileIds, true);
      onClear();
      router.refresh();
    });
  };

  const handleMakePrivate = () => {
    startTransition(async () => {
      await bulkSetPublic(fileIds, false);
      onClear();
      router.refresh();
    });
  };

  const handleRemoveTag = (tagId: string) => {
    startTransition(async () => {
      await bulkRemoveTag(fileIds, tagId);
      onClear();
      router.refresh();
    });
  };

  if (selected.length === 0) return null;

  return (
    <div className="flex items-center gap-3 flex-wrap rounded-lg bg-accent/10 px-4 py-3">
      <span className="font-poppins text-sm font-semibold text-base-content">
        {selected.length} selected
      </span>

      <button
        disabled={isPending}
        onClick={() => showDialog("bulkAddTag")}
        className="btn btn-sm btn-primary"
      >
        Add Tag
      </button>

      {sharedTags.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/60">Remove:</span>
          {sharedTags.map((t) => (
            <button
              key={t.id}
              disabled={isPending}
              onClick={() => handleRemoveTag(t.id)}
              className="hover:opacity-60 transition-opacity"
            >
              <Tag text="normal" bgColor={t.bgColor} textColor={t.textColor} label={t.name} />
            </button>
          ))}
        </div>
      )}

      <button disabled={isPending} onClick={handleMakePublic} className="btn btn-sm btn-success">
        Make Public
      </button>
      <button disabled={isPending} onClick={handleMakePrivate} className="btn btn-sm btn-warning">
        Make Private
      </button>

      <button onClick={onClear} className="btn btn-sm btn-ghost ml-auto">
        Clear
      </button>

      <BulkAddTagDialog fileIds={fileIds} existingTagIds={existingTagIds} onDone={onClear} />
    </div>
  );
};

const BulkAddTagDialog = ({
  fileIds,
  existingTagIds,
  onDone,
}: {
  fileIds: string[];
  existingTagIds: string[];
  onDone: () => void;
}) => {
  const { resetDialogContext } = useDialog();
  const router = useRouter();
  const [allTags, setAllTags] = useState<TagOption[]>([]);
  const [query, setQuery] = useState("");
  const [bgColor, setBgColor] = useState("#e5e7eb");
  const [textColor, setTextColor] = useState("#111827");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  const { matches, canCreate } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const available = allTags.filter((t) => !existingTagIds.includes(t.id));
    const matches =
      q.length === 0 ? available : available.filter((t) => t.name.toLowerCase().includes(q));
    const exact = allTags.some((t) => t.name.toLowerCase() === q);
    return { matches, canCreate: q.length > 0 && !exact };
  }, [allTags, existingTagIds, query]);

  const handleAddExisting = (tagId: string) => {
    startTransition(async () => {
      await bulkAddTag({ fileIds, tagId });
      resetDialogContext();
      onDone();
      router.refresh();
    });
  };

  const handleCreate = () => {
    const name = query.trim();
    if (!name) return;
    startTransition(async () => {
      await bulkAddTag({ fileIds, newTag: { name, bgColor, textColor } });
      resetDialogContext();
      onDone();
      router.refresh();
    });
  };

  return (
    <Dialog.Root identifier="bulkAddTag">
      <Dialog.Title>Add Tag to {fileIds.length} Files</Dialog.Title>
      <div className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          autoFocus
          placeholder="Search or create a tag…"
          className="input input-bordered w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {matches.length === 0 && !canCreate && (
            <p className="text-sm text-base-content/60 font-poppins">No tags available.</p>
          )}
          {matches.map((t) => (
            <button
              key={t.id}
              disabled={isPending}
              onClick={() => handleAddExisting(t.id)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 text-left"
            >
              <Tag text="normal" bgColor={t.bgColor} textColor={t.textColor} label={t.name} />
            </button>
          ))}
        </div>

        {canCreate && (
          <div className="flex flex-col gap-3 border-t border-base-300 pt-4">
            <p className="font-poppins text-sm text-base-content/70">
              Create new tag <span className="font-semibold">{query.trim()}</span>
            </p>
            <div className="flex items-center gap-3">
              <span className="font-poppins text-xs text-base-content/60">Preview:</span>
              <Tag text="normal" bgColor={bgColor} textColor={textColor} label={query.trim()} />
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-poppins text-xs text-base-content/60">Background</label>
                <HexColorPicker color={bgColor} onChange={setBgColor} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-poppins text-xs text-base-content/60">Text</label>
                <HexColorPicker color={textColor} onChange={setTextColor} />
              </div>
            </div>
            <button
              disabled={isPending}
              onClick={handleCreate}
              className="btn btn-primary btn-sm self-start"
            >
              Create and attach
            </button>
          </div>
        )}
      </div>
    </Dialog.Root>
  );
};

export default FilesBulkActionBar;

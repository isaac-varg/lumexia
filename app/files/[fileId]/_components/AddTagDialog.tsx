'use client'
import { useEffect, useMemo, useState, useTransition } from "react"
import { HexColorPicker } from "react-colorful"
import { useRouter } from "next/navigation"
import Dialog from "@/components/Dialog"
import Tag from "@/components/Text/Tag"
import useDialog from "@/hooks/useDialog"
import { getAllTags, TagOption } from "../_actions/getAllTags"
import { addFileTag } from "../_actions/addFileTag"

type Props = {
  fileId: string;
  existingTagIds: string[];
};

const AddTagDialog = ({ fileId, existingTagIds }: Props) => {
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
    const matches = q.length === 0
      ? available
      : available.filter((t) => t.name.toLowerCase().includes(q));
    const exact = allTags.some((t) => t.name.toLowerCase() === q);
    return { matches, canCreate: q.length > 0 && !exact };
  }, [allTags, existingTagIds, query]);

  const handleAddExisting = (tagId: string) => {
    startTransition(async () => {
      await addFileTag({ fileId, tagId });
      resetDialogContext();
      router.refresh();
    });
  };

  const handleCreate = () => {
    const name = query.trim();
    if (!name) return;
    startTransition(async () => {
      await addFileTag({ fileId, newTag: { name, bgColor, textColor } });
      resetDialogContext();
      router.refresh();
    });
  };

  return (
    <Dialog.Root identifier="addFileTag">
      <Dialog.Title>Add Tag</Dialog.Title>
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

export default AddTagDialog;

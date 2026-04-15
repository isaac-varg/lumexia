import { FileResponseData } from "@/app/api/upload/route"
import Card from "@/components/Card"
import Uploader from "@/components/Uploader/Uploader"
import { useItemSelection } from "@/store/itemSlice"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { HexColorPicker } from "react-colorful"
import { ItemFileType } from "../../_actions/files/getItemFilesTypes"
import { createItemFile } from "../../_actions/files/createItemFile"
import { createActivityLog } from "@/utils/auxiliary/createActivityLog"
import { getAllTags, TagOption } from "@/app/files/[fileId]/_actions/getAllTags"
import { addFileTag } from "@/app/files/[fileId]/_actions/addFileTag"
import Tag from "@/components/Text/Tag"

const Upload = () => {

  const router = useRouter();
  const [step, setStep] = useState<'upload' | 'type' | 'tag'>('upload')
  const [filesData, setFilesData] = useState<FileResponseData[]>([]);
  const [selectedType, setSelectedType] = useState<ItemFileType | null>(null);
  const [allTags, setAllTags] = useState<TagOption[]>([]);
  const [query, setQuery] = useState("");
  const [bgColor, setBgColor] = useState("#e5e7eb");
  const [textColor, setTextColor] = useState("#111827");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { item, options } = useItemSelection()

  useEffect(() => {
    if (step === 'tag') {
      getAllTags().then(setAllTags);
    }
  }, [step]);

  const { matches, canCreate } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = q.length === 0
      ? allTags
      : allTags.filter((t) => t.name.toLowerCase().includes(q));
    const exact = allTags.some((t) => t.name.toLowerCase() === q);
    return { matches, canCreate: q.length > 0 && !exact };
  }, [allTags, query]);

  const handleUpload = (results: FileResponseData[]) => {
    setFilesData(results);
    setStep('type');
  }

  const handleTypeSelect = (type: ItemFileType) => {
    setSelectedType(type);
    setStep('tag');
  }

  const resetFlow = () => {
    setFilesData([]);
    setSelectedType(null);
    setQuery("");
    setBgColor("#e5e7eb");
    setTextColor("#111827");
    setStep('upload');
  }

  const finalize = async (tag?: { tagId?: string; newTag?: { name: string; bgColor: string; textColor: string } }) => {
    if (filesData.length === 0 || !item || !selectedType) return;
    setIsSubmitting(true);
    try {
      await Promise.all(
        filesData.map(file =>
          createItemFile({ fileTypeId: selectedType.id, fileId: file.fileId, itemId: item.id })
        )
      );

      if (tag?.tagId) {
        await Promise.all(
          filesData.map(file => addFileTag({ fileId: file.fileId, tagId: tag.tagId! }))
        );
      } else if (tag?.newTag) {
        await Promise.all(
          filesData.map(file => addFileTag({ fileId: file.fileId, newTag: tag.newTag! }))
        );
      }

      const context = filesData.length === 1
        ? `Uploaded file ${filesData[0].name}`
        : `Uploaded ${filesData.length} files`;
      await createActivityLog('uploadFile', 'item', item.id, { context });

      resetFlow();
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleSkipTag = () => finalize();
  const handleExistingTag = (tagId: string) => finalize({ tagId });
  const handleCreateTag = () => {
    const name = query.trim();
    if (!name) return;
    finalize({ newTag: { name, bgColor, textColor } });
  }

  const titleMap = {
    upload: 'Upload',
    type: 'Select Type',
    tag: 'Add Tag',
  } as const;

  return (
    <Card.Root>
      <Card.Title>{titleMap[step]}</Card.Title>

      {step === 'upload' && (
        <Uploader
          pathPrefix="/item/"
          multiple
          onMultipleComplete={handleUpload}
        />
      )}

      {step === 'type' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-base-content/60 font-poppins">
            {filesData.length === 1
              ? 'Choose a file type to finish uploading.'
              : `Choose a file type for all ${filesData.length} uploaded files.`}
          </p>
          <div className="flex flex-wrap gap-3">
            {options.itemFileTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type)}
                className="btn btn-md capitalize font-poppins"
                style={{ backgroundColor: type.bgColor, color: type.textColor }}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'tag' && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-base-content/60 font-poppins">
            {filesData.length === 1
              ? 'Optionally add a tag to this file.'
              : `Optionally add a tag to all ${filesData.length} files.`}
          </p>

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
                disabled={isSubmitting}
                onClick={() => handleExistingTag(t.id)}
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
                disabled={isSubmitting}
                onClick={handleCreateTag}
                className="btn btn-primary btn-sm self-start"
              >
                Create and attach
              </button>
            </div>
          )}

          <div className="flex justify-end border-t border-base-300 pt-4">
            <button
              disabled={isSubmitting}
              onClick={handleSkipTag}
              className="btn btn-ghost btn-sm"
            >
              Skip
            </button>
          </div>
        </div>
      )}

    </Card.Root>
  )
}

export default Upload

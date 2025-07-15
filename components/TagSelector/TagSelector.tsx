// Still in your component file

import { TagSelectorProvider, useTagSelector } from "./TagSelectorContext";

function TagList<T>() {
    // ✅ CORRECT: This hook is now called within a component
    // that is a child of TagSelectorProvider.
    const { tags } = useTagSelector<T>();

    return (
        <>
            {tags.map((tag: any) => ( // Using 'any' for simplicity, assuming tag has id/name
                <p key={tag.id}>
                    {tag.name}
                </p>
            ))}
        </>
    );
}

// 2. The parent component now only sets up the provider.
// Note the change in the 'initialTags' prop type to T[]
export const TagSelector = <T,>({ initialTags }: { initialTags: T[] }) => {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg">
            <TagSelectorProvider initialTags={initialTags}>
                <TagList<T> />
            </TagSelectorProvider>
        </div>
    );
}

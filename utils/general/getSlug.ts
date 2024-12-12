export const getSlug = (unformatted: string): string => {
    return unformatted
        .replace(/[^\w\s-]/g, '') // Remove characters that are not word characters, spaces, or hyphens
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .toLowerCase();           // Convert to lowercase
}

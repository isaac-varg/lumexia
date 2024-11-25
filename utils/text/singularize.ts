// only works with s ending words...
// made really only for micro submission form
export const singularize = (word: string): string => {
    if (word.endsWith('s')) {
        return word.slice(0, -1);
    }
    return word;
}

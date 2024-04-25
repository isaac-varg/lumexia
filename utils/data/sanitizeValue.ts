export const sanitizeValue = (value: string): string => {
  return value.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

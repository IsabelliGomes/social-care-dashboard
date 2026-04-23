export const parseBoolean = (value?: string): boolean | undefined => {
  if (value === undefined) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

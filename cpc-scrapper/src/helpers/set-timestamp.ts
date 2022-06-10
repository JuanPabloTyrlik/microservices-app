export const setTimestamp = (): string => {
  return new Date().toISOString().replace("T", " ").replace(/\..+$/, "");
};

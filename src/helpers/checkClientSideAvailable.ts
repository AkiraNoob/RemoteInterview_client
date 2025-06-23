export const clientSideAvailable = () => {
  if (typeof window !== "undefined") return true;
  return false;
};

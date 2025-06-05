export const generatePrefix = (prefix) => {
  const currentYear = new Date().getFullYear();
  return `${prefix}-${currentYear}-`;
};

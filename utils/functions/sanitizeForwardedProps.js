export const sanitizeForwardedProps = (props = {}) => {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => typeof key === 'string' && key.trim() !== '')
  );
};

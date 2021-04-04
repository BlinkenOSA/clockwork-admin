export const normalizeManyFields = (values) => {
  Object.keys(values).forEach((key) => {
    if (Array.isArray(values[key])) {
      values[key].forEach(obj => {
        Object.keys(obj).forEach(key => (obj[key] === undefined || obj[key] === "")  && delete obj[key])
      });
      values[key] = values[key].filter(value => Object.keys(value).length !== 0);
    }
  });
  return values;
};

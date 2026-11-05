export const removeIDFromManyFields = (data, fieldList) => {
  fieldList.forEach(field => {
    if (data.hasOwnProperty(field)) {
      data[field].forEach(f => {
        if (f.hasOwnProperty('id')) {
          delete(f['id'])
        }
      })
    }
  });
  return data;
};

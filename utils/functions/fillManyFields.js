export const fillManyFields = (data, fieldList) => {
  fieldList.forEach(field => {
    if (data.hasOwnProperty(field)) {
      if (data[field].length === 0) {
        data[field] = [{}];
      }
    } else {
      data[field] = [{}];
    }
  });
  return data;
};

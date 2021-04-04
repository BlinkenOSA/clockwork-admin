export const renderTabTitle = (form, fields, title) => {
  fields.forEach(field => {
    const error = form.getFieldError(field);
    if (error.length > 0) {
      return "Hiba!"
    }
  });
  return title;
};

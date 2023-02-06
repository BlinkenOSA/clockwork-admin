export const checkRequiredIfArchival = (form, itemTypeField, isMany=false) => ({
  validator(_, value) {
    isMany && itemTypeField.unshift('request_items')
    const itemType = form.getFieldValue(itemTypeField)
    if (itemType) {
      if (itemType === 'FA') {
        if (value) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('This value is required when the item type is Archival!'));
        }
      }
    }
    return Promise.resolve()
  }
})

export const checkRequiredIfLibrary = (form, itemTypeField, isMany=false) => ({
  validator(_, value) {
    isMany && itemTypeField.unshift('request_items')
    const itemType = form.getFieldValue(itemTypeField)
    if (itemType) {
      if (itemType !== 'FA') {
        if (value) {
          return Promise.resolve();
        } else {
          return Promise.reject(new Error('This value is required when the item type is Library or Film Library!'));
        }
      }
    }
    return Promise.resolve()
  }
})
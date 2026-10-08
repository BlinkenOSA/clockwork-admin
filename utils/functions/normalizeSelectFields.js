export const normalizeSelectFields = (values) => {
  const isObject = obj => {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
  }

  const checkIfLabelInValue = (entity) => {
    if (isObject(entity)) {
      if (entity.hasOwnProperty('label')) {
        entity = entity['value']
      } else {
        Object.keys(entity).forEach(entityKey => {
          entity[entityKey] = checkIfLabelInValue(entity[entityKey])
        })
      }
    }
    return entity
  }

  const iterateObject = (values) => {
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        iterateObject(values[key])
      } else {
        values[key] = checkIfLabelInValue(values[key])
      }
    })
    return values
  };

  return iterateObject(values)
};

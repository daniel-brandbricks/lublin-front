export function checkIsSet (data, object, keyForCheck = 'id') {
  if (undefined === data || data === null || data.length < 1) {
    return -1
  }

  for (const [ key, datum ] of data.entries()) {
    if (parseInt(datum[keyForCheck]) !== parseInt(object[keyForCheck])) {
      continue
    }
    return key
  }
  return -1
}

export function empty (v) {
  let type = typeof v
  if (type === 'undefined') {
    return true
  }
  if (type === 'boolean') {
    return !v
  }
  if (v === null) {
    return true
  }
  if (v === undefined) {
    return true
  }
  if (v instanceof Array) {
    if (v.length < 1) {
      return true
    }
  } else if (type === 'string') {
    if (v.length < 1) {
      return true
    }
    if (v === '0') {
      return true
    }
  } else if (type === 'object') {
    if (Object.keys(v).length < 1) {
      return true
    }
  } else if (type === 'number') {
    if (v === 0) {
      return true
    }
  }
  return false
}

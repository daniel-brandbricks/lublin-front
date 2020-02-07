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

export function checkPesel (s) {
  // Sprawdź długość, musi być 11 znaków
  if (s.length !== 11) return false

  // Sprawdź, czy wszystkie znaki to cyfry
  // eslint-disable-next-line no-array-constructor
  var aInt = []
  for (let i = 0; i < 11; i++) {
    aInt[i] = parseInt(s.substring(i, i + 1))
    if (isNaN(aInt[i])) {
      return false
    }
  }

  // Sprawdź sumę kontrolną
  var wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1]
  var sum = 0
  for (let i = 0; i < 11; i++) { sum += wagi[i] * aInt[i] }
  return (sum % 10) === 0;
}

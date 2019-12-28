export function prepareLeaderPermissions ([...permissions]) {
  for (let schoolIndex in permissions) {
    let preparedIdsArray = []
    for (let placeIndex in permissions[schoolIndex].places) {
      if (permissions[schoolIndex].places[placeIndex] && permissions[schoolIndex].places[placeIndex].id) {
        preparedIdsArray.push(permissions[schoolIndex].places[placeIndex].id)
      }
    }
    permissions[schoolIndex].places = preparedIdsArray.length > 0 ? preparedIdsArray : permissions[schoolIndex].places

    if (typeof permissions[schoolIndex].permissions === 'string') {
      permissions[schoolIndex].permissions = JSON.parse(permissions[schoolIndex].permissions)
    }
  }

  return permissions
}

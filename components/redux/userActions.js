
export function setUserName(name) {

  // Make API call to Update Database

  // Update Locally
  return {type: 'SET_USER_NAME', payload: name}
}

export function setUserImage(profileImage) {

  // Update Locally
  return {type: 'SET_USER_IMAGE', payload: profileImage}
}

export function fetchEditProfilePopup(popup)
{
  return {type: 'FETCH_EDIT_PROFILE_POPUP', payload: popup}
}
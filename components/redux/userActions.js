export function setUserEmail(email) {
  
  // Update Locally
  return {type: 'SET_USER_EMAIL', payload: email}
}


export function setUserName(name) {

  // Update Locally
  return {type: 'SET_USER_NAME', payload: name}
}

export function setUserImage(profileImage) {

  // Update Locally
  return {type: 'SET_USER_IMAGE', payload: profileImage}
}

export function fetchMainNavigator(navigator)
{
  return {type: 'FETCH_MAIN_NAVIGATOR', payload: navigator}
}

export function fetchEditProfilePopup(popup)
{
  return {type: 'FETCH_EDIT_PROFILE_POPUP', payload: popup}
}
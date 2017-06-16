export function setUserEmail(email) {
  
  // Update Locally
  return {type: 'SET_USER_EMAIL', payload: email}
}


export function setUserName(name) {

  // Update Locally
  return {type: 'SET_USER_NAME', payload: name}
}

export function setUserBirthday(birthday) {
  
  // Update Locally
  return {type: 'SET_USER_BIRTHDAY', payload: birthday}
}

export function setUserRelationshipStatus(relationshipStatus) {
  
  // Update Locally
  return {type: 'SET_USER_RELATIONSHIP_STATUS', payload: relationshipStatus}
}

export function setUserSex(sex) {
  
  // Update Locally
  return {type: 'SET_USER_SEX', payload: sex}
}

export function setUserLocation(location) {
  
  // Update Locally
  return {type: 'SET_USER_LOCATION', payload: location}
}

export function setUserBio(bio) {
  
  // Update Locally
  return {type: 'SET_USER_BIO', payload: bio}
}

export function setUserImage(profileImage) {

  // Update Locally
  return {type: 'SET_USER_IMAGE', payload: profileImage}
}

export function editProfileSubmit(name, birthday, relationshipStatus, sex, location, bio, image)
{
  return dispatch =>
  {
    dispatch(setUserName(name))
    dispatch(setUserBirthday(birthday))
    dispatch(setUserRelationshipStatus(relationshipStatus))
    dispatch(setUserSex(sex))
    dispatch(setUserLocation(location))
    dispatch(setUserBio(bio))
    dispatch(setUserImage(image))
    
  }
}
export function fetchEditProfilePopup(popup)
{
  return {type: 'FETCH_EDIT_PROFILE_POPUP', payload: popup}
}
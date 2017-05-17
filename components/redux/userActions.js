export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    // Retrieve Info From RDS.. On Start and Every Refresh
    payload: {
      name: "Will",
      age: 35
    }
  }
}

export function setUserEmail(email) {

  // Make API call to Update Database

  // Update Locally
  return {type: 'SET_USER_EMAIL', payload: email}

}

export function setUserName(name) {

  // Make API call to Update Database

  // Update Locally
  return {type: 'SET_USER_NAME', payload: name}
}

export function setUserAge(age) {

  // Make API call to Update Database

  // Update Locally
  return {type: 'SET_USER_AGE', payload: age}
}
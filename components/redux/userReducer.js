export default function reducer(state = {
  user: {
    email: null,
    name: null,
    birthday: null,
    relationshipStatus: null,
    sex: null,
    location: null,
    bio: null,
    profileImage: null
  },
  mainNavigator: null,
  editProfilePopup: null
}, action) {

  switch (action.type) {

    case "SET_USER_EMAIL":
      {
        return {
          ...state,
          user: {
            ...state.user,
            email: action.payload
          }
        }
      }

    case "SET_USER_NAME":
      {
        return {
          ...state,
          user: {
            ...state.user,
            name: action.payload
          }
        }
      }

    case "SET_USER_IMAGE":
      {
        return {
          ...state,
          user: {
            ...state.user,
            profileImage: action.payload
          }
        }
      }

    case "FETCH_MAIN_NAVIGATOR":
      {
        return {
          ...state,
          mainNavigator: action.payload
        }
      }

    case "FETCH_EDIT_PROFILE_POPUP":
      {
        return {
          ...state,
          editProfilePopup: action.payload
        }
      }

  }

  return state
}
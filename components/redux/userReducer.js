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

    case "SET_USER_BIRTHDAY":
      {
        return {
          ...state,
          user: {
            ...state.user,
            birthday: action.payload
          }
        }
      }

    case "SET_USER_RELATIONSHIP_STATUS":
      {
        return {
          ...state,
          user: {
            ...state.user,
            relationshipStatus: action.payload
          }
        }
      }

    case "SET_USER_SEX":
      {
        return {
          ...state,
          user: {
            ...state.user,
            sex: action.payload
          }
        }
      }

    case "SET_USER_LOCATION":
      {
        return {
          ...state,
          user: {
            ...state.user,
            location: action.payload
          }
        }
      }

    case "SET_USER_BIO":
      {
        return {
          ...state,
          user: {
            ...state.user,
            bio: action.payload
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
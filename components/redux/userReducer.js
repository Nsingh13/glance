export default function reducer(state={
    user: {
      name: null,
      profileImage: null,
    },
    editProfilePopup: null,
  }, action) {

    switch (action.type) {

      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }

      case "SET_USER_IMAGE": {
        return {
          ...state,
          user: {...state.user, profileImage: action.payload},
        }
      }

      case "FETCH_EDIT_PROFILE_POPUP": {
        return {...state, editProfilePopup: action.payload}
      }
    }

    return state
}
import { ActionUser, UserState, UserTypes } from "../types";

const initialState: UserState = {
  user: [],
  userDetails: {},
  loading: false,
  error: "",
};

export const reducerUser = (
  state = initialState,
  action: ActionUser
): UserState => {
  switch (action.type) {
    case UserTypes.LOADING_USER:
      return { ...state, loading: true };
    case UserTypes.USER:
      return { ...state, user: action.payload, loading: false };
    case UserTypes.USER_DETAILS:
      return { ...state, userDetails: action.payload, loading: false };
    case UserTypes.ERROR_USER:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

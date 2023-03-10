import { ActionUser, UserState, UserTypes } from "../types";

const initialState: UserState = {
  user: [],
  userDetails: {},
};

export const reducerUser = (
  state = initialState,
  action: ActionUser
): UserState => {
  switch (action.type) {
    case UserTypes.USER:
      return { ...state, user: action.payload };

    case UserTypes.USER_DETAILS:
      return { ...state, userDetails: action.payload };
    default:
      return state;
  }
};

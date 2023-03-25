import {
  IFormAuth,
  IFormTypesAuth,
  IStateAuthUser,
} from "../formAuthInterfaces";

const initialState: IStateAuthUser = {
  loading: false,
  error: "",
  loginUser: { id: "", access: "", username: "", password: "" },
};

export const reducerAuth = (state = initialState, action: IFormAuth) => {
  switch (action.type) {
    case IFormTypesAuth.LOADING_AUTH: {
      return { ...state, loading: true };
    }
    case IFormTypesAuth.LOGIN_USER: {
      return {
        ...state,
        loginUser: action.payload,
        loading: false,
        error: "",
      };
    }
    case IFormTypesAuth.ERROR_AUTH: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
};

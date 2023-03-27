import {
  IForgotPasswordTypes,
  IFormForgotPassword,
  IStateForgotPassword,
} from "../interfacesForgotPassword";

const initialState = {
  loading: false,
  forgotPassword: {},
  error: "",
} as IStateForgotPassword;

export const forgotPasswordReducer = (
  state = initialState,
  action: IFormForgotPassword
) => {
  switch (action.type) {
    case IForgotPasswordTypes.FORGOT_LOADING: {
      return { ...state, loading: true };
    }
    case IForgotPasswordTypes.FORGOT_PASSWORD: {
      return {
        ...state,
        loading: false,
        forgotPassword: action.payload,
        error: "",
      };
    }
    case IForgotPasswordTypes.FORGOT_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

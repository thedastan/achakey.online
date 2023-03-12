import {
  IForms,
  IFormsTypes,
  IStateForgotPassword,
} from "../../formInterfaces";

const initialState = {
  loading: false,
  forgotPassword: {},
  error: "",
} as IStateForgotPassword;

export const forgotPasswordReducer = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.FORGOT_LOADING: {
      return { ...state, loading: true };
    }
    case IFormsTypes.FORGOT_PASSWORD: {
      return { ...state, forgotPassword: action.payload, loading: false };
    }
    case IFormsTypes.ERROR_USER: {
      return { ...state, error: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
};

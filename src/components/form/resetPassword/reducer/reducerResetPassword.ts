import { IForms, IFormsTypes, IStateResetPassword } from "../../formInterfaces";
const initialState = {
  loading: false,
  error: "",
  resetPassword: {},
} as IStateResetPassword;

export const resetPasswordReducer = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.RESET_LOADING: {
      return { ...state, loading: true };
    }
    case IFormsTypes.RESET_PASSWORD: {
      return { ...state, resetPassword: action.payload, loading: false };
    }
    case IFormsTypes.ERROR_USER: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
};

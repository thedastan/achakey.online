import {
  IFormResetPassord,
  IFormTypesResetPasswordPhone,
  IStateResetPassPhone,
} from "../InterfaceResetPassword";

const initialState = {
  loading: false,
  resetPassPhone: {},
  error: "",
} as IStateResetPassPhone;

export const reducerResetPasswordPhone = (
  state = initialState,
  action: IFormResetPassord
) => {
  switch (action.type) {
    case IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE_LOADING:
      return { ...state, loading: true };
    case IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE:
      return {
        ...state,
        loading: false,
        resetPassPhone: action.payload,
        error: "",
      };
    case IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

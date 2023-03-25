import {
  IEmailVerify,
  IEmailVerifyTypes,
  IStateEmailVerify,
} from "../EmailVerifyInterface";

const initialState: IStateEmailVerify = {
  emailVerify: {
    email: "",
  },
  loading: false,
  error: "",
  authModal: false,
};

export const emailVerifyReducer = (
  state = initialState,
  action: IEmailVerify
) => {
  switch (action.type) {
    case IEmailVerifyTypes.LOADING_VERIFY:
      return { ...state, loading: true };
    case IEmailVerifyTypes.EMAIL_VERIFY:
      return {
        ...state,
        emailVerify: action.payload,
        error: "",
        loading: false,
        authModal: true,
      };
    case IEmailVerifyTypes.ERROR_VERIFY:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case IEmailVerifyTypes.AUTH_MODAL_OPEN:
      return { ...state, authModal: action.payload };
    default:
      return state;
  }
};

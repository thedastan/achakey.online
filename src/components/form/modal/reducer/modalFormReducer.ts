import {
  IModalActionTypes,
  IModalsForm,
  IStateModalForm,
} from "../action/ModalActionType";

const initialState: IStateModalForm = {
  register: false,
  login: false,
  forgotPas: false,
  loginForgot: false,
  exterSequirity: false,
};

export const reducerModalForm = (state = initialState, action: IModalsForm) => {
  switch (action.type) {
    case IModalActionTypes.REGISTER_MODAL: {
      return {
        ...state,
        register: action.payload,
        login: false,
        forgotPas: false,
        loginForgot: false,
        exterSequirity: false,
      };
    }
    case IModalActionTypes.LOGIN_MODAL: {
      return {
        ...state,
        register: false,
        login: action.payload,
        forgotPas: false,
        loginForgot: false,
        exterSequirity: false,
      };
    }
    case IModalActionTypes.FORGOT_PASS_MODAL: {
      return {
        ...state,
        register: false,
        login: false,
        forgotPas: action.payload,
        loginForgot: false,
        exterSequirity: false,
      };
    }
    default:
      return state;
  }
};

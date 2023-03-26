export type IModal = {
  isOpen: boolean;
  onClose: () => void;
};

export interface IStateModalForm {
  register: boolean;
  login: boolean;
  forgotPas: boolean;
  exterSequirity: boolean;
}

export enum IModalActionTypes {
  REGISTER_MODAL = "REGISTER_MODAL",
  LOGIN_MODAL = "LOGIN_MODAL",
  FORGOT_PASS_MODAL = "FORGOT_PASS_MODAL",
  LOGIN_FORGOT_MODAL = "LOGIN_FORGOT_MODAL",
  ENTER_SEQUIRITY_MODAL = "ENTER_SEQUIRITY_MODAL",
}

interface IModalRegister {
  type: IModalActionTypes.REGISTER_MODAL;
  payload: boolean;
}

interface IModalLogin {
  type: IModalActionTypes.LOGIN_MODAL;
  payload: boolean;
}

interface IModalForgotPassword {
  type: IModalActionTypes.FORGOT_PASS_MODAL;
  payload: boolean;
}

interface IModalEnterSequirity {
  type: IModalActionTypes.ENTER_SEQUIRITY_MODAL;
  payload: boolean;
}

export type IModalsForm =
  | IModalRegister
  | IModalLogin
  | IModalForgotPassword
  | IModalEnterSequirity;

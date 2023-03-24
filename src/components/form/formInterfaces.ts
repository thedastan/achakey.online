export interface IInputRegister {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  password: string;
  password_confirm: string;
}

export interface IInputEnterSequirityCode {
  phone: string;
  code: number;
}

export interface IForgotPassword {
  phone?: string;
  email?: string;
}

export interface IAuthForgot {
  emailOrNumber: string;
  password: string;
  forgotPassword: string;
}

export interface IInputResetPassword {
  token: string;
  password: string;
}

export interface IInputChangePassword {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface IStateRegister {
  loading: boolean;
  error: any | string;
  registerUser: IInputRegister;
  phoneNumber: string;
}

export interface IStateResetPassword {
  loading: boolean;
  error: any | string;
  resetPassword: IInputResetPassword;
}

export interface IStateForgotPassword {
  loading: boolean;
  error: any | string;
  forgotPassword: IForgotPassword;
}

export interface IStateEnterSequirityCode {
  loading: boolean;
  error: string | any;
  sequirityCode: IInputEnterSequirityCode;
}

export interface IStateChangePassword {
  loading: boolean;
  changePass: IInputChangePassword;
  errorChangePassword: string | any;
}

export enum IFormsTypes {
  REGISTER_USER = "REGISTER_USER",
  RESET_LOADING = "RESET_LOADING",
  RESET_PASSWORD = "RESET_PASSWORD",
  LOADING_REGISTER = "LOADING_REGISTER",
  ERROR_USER = "ERROR_USER",
  VALIDATE_REGISTER = "VALIDATE_REGISTER",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  FORGOT_LOADING = "FORGOT_LOADING",
  PHONE_NUMBER_REGISTER = "PHONE_NUMBER_REGISTER",
  ENTER_SEQUIRITY_CODE = "ENTER_SEQUIRITY_CODE",
  LOADING_SEQUIRITY_CODE = "LOADING_SEQUIRITY_CODE",
  LOADING_CHANGE_PASSWORD = "LOADING_CHANGE_PASSWORD",
  ERROR_CHANGE_PASSWORD = "ERROR_CHANGE_PASSWORD",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

interface ILoadingRegister {
  type: IFormsTypes.LOADING_REGISTER;
}

interface ILoadingReset {
  type: IFormsTypes.RESET_LOADING;
}

interface IResetPassword {
  type: IFormsTypes.RESET_PASSWORD;
  payload: any;
}

interface IErrorUser {
  type: IFormsTypes.ERROR_USER;
  payload: any;
}

interface IRegister {
  type: IFormsTypes.REGISTER_USER;
  payload: IInputRegister;
}

interface IForgotPasswordLoading {
  type: IFormsTypes.FORGOT_LOADING;
}

interface IForgotPasswordSUccess {
  type: IFormsTypes.FORGOT_PASSWORD;
  payload: IForgotPassword;
}

interface IPhoneNumberRegister {
  type: IFormsTypes.PHONE_NUMBER_REGISTER;
  payload: string;
}

interface IEnterSequirity {
  type: IFormsTypes.ENTER_SEQUIRITY_CODE;
  payload: any;
}

interface IEnterSequirityLoading {
  type: IFormsTypes.LOADING_SEQUIRITY_CODE;
}

interface IChangePasswordLoading {
  type: IFormsTypes.LOADING_CHANGE_PASSWORD;
}

interface IChangePasswordError {
  type: IFormsTypes.ERROR_CHANGE_PASSWORD;
  payload: any | string;
}

interface IChangePassword {
  type: IFormsTypes.CHANGE_PASSWORD;
  payload: any;
}

export type IForms =
  | IRegister
  | IErrorUser
  | ILoadingRegister
  | IForgotPasswordLoading
  | IForgotPasswordSUccess
  | ILoadingReset
  | IResetPassword
  | IPhoneNumberRegister
  | IEnterSequirity
  | IEnterSequirityLoading
  | IChangePasswordLoading
  | IChangePasswordError
  | IChangePassword;

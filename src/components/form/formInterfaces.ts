export interface IInputRegister {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  password: string;
  password_confirm: string;
}

export interface IInputAuth {
  id?: string;
  access?: string;
  username: string;
  password: string;
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

export interface IStateAuth {
  loading: boolean;
  error: any | string;
  authUser: IInputAuth;
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

export enum IFormsTypes {
  REGISTER_USER = "REGISTER_USER",
  RESET_LOADING = "RESET_LOADING",
  RESET_PASSWORD = "RESET_PASSWORD",
  LOGIN_USER = "LOGIN_USER",
  LOADING_USER = "LOADING_USER",
  LOADING_REGISTER = "LOADING_REGISTER",
  ERROR_USER = "ERROR_USER",
  VALIDATE_REGISTER = "VALIDATE_REGISTER",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
  FORGOT_LOADING = "FORGOT_LOADING",
  PHONE_NUMBER_REGISTER = "PHONE_NUMBER_REGISTER",
  ENTER_SEQUIRITY_CODE = "ENTER_SEQUIRITY_CODE",
  LOADING_SEQUIRITY_CODE = "LOADING_SEQUIRITY_CODE",
}

interface ILoadingUser {
  type: IFormsTypes.LOADING_USER;
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

interface ILogin {
  type: IFormsTypes.LOGIN_USER;
  payload: IInputAuth;
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

export type IForms =
  | IRegister
  | ILogin
  | ILoadingUser
  | IErrorUser
  | ILoadingRegister
  | IForgotPasswordLoading
  | IForgotPasswordSUccess
  | ILoadingReset
  | IResetPassword
  | IPhoneNumberRegister
  | IEnterSequirity
  | IEnterSequirityLoading;

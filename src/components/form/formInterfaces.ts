export interface IInputRegister {
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  password: string;
  password_confirm: string;
}

export interface IInputAuth {
  id: string;
  email: string;
  password: string;
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

export interface IValidateRegister {
  errorEmail: string;
  errorPhone: string;
}
export interface IStateRegister {
  loading: boolean;
  error: any | string;
  registerUser: IInputRegister;
  validateRegister: IValidateRegister;
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

interface IErrorValidationRegister {
  type: IFormsTypes.VALIDATE_REGISTER;
  payload: IValidateRegister;
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

export type IForms =
  | IRegister
  | ILogin
  | ILoadingUser
  | IErrorUser
  | ILoadingRegister
  | IErrorValidationRegister
  | IForgotPasswordLoading
  | IForgotPasswordSUccess
  | ILoadingReset
  | IResetPassword;

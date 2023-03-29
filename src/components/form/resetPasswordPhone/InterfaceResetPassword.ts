export interface IResetPasswordPhoneInput {
  phone: string;
  code?: string;
  password?: string;
  password_confirm?: string;
}

export interface IStateResetPassPhone {
  loading: boolean;
  resetPassPhone: any;
  error: string;
}

export enum IFormTypesResetPasswordPhone {
  RESET_PASSWORD_PHONE = "RESET_PASSWORD_PHONE",
  RESET_PASSWORD_PHONE_ERROR = "RESET_PASSWORD_PHONE_ERROR",
  RESET_PASSWORD_PHONE_LOADING = "RESET_PASSWORD_PHONE_LOADING",
}

interface IResetPasswordPhoneLoading {
  type: IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE_LOADING;
}

interface IResetPasswordPhoneSuccess {
  type: IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE;
  payload: IResetPasswordPhoneInput;
}

interface IResetPasswordPhoneError {
  type: IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE_ERROR;
  payload: string | any;
}

export type IFormResetPassord =
  | IResetPasswordPhoneLoading
  | IResetPasswordPhoneSuccess
  | IResetPasswordPhoneError;

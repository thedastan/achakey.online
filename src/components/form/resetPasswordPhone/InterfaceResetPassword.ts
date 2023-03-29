export interface IResetPasswordPhoneInput {
  phone: string;
  code: string;
  password: string;
  password_confirm: string;
}

export interface IStateResetPassPhone {
  loading: boolean
  resetPassPhone: any
  error: string
}

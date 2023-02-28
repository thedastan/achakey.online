export type Inputs = {
  name: string
  emailOrNumber: string
  password: string
  repeatPassword: string
}

export type IInputAuth = {
  emailOrNumber: string
  password: string
}

export type IForgotPasword = {
  phone: string
}

export type IAuthForgot = {
  emailOrNumber: string
  password: string
  forgotPassword: string
}

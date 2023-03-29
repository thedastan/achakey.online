import { IStateResetPassPhone } from "../InterfaceResetPassword"

 const initialState ={
    loading: false,
    resetPassPhone: {},
    error: ""
} as IStateResetPassPhone

export const reducerResetPasswordPhone = (state=initialState, action:any)=>{}
import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../../api/Index";
import { IResetPasswordPhoneInput } from "../InterfaceResetPassword";

export const fetchResetPasswordPhone = (
  resetPhone: IResetPasswordPhoneInput
) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await PUBLIC_API.post(
        "account/password-reset-number/confirm/",
        {
          ...resetPhone,
        }
      );
      console.log(res.data);
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../../api/Index";
import { toastMessageFunction } from "../../../toast-message/action/ActionToast";
import {
  IFormResetPassord,
  IFormTypesResetPasswordPhone,
  IResetPasswordPhoneInput,
} from "../InterfaceResetPassword";

export const fetchResetPasswordPhone = (
  resetPhone: IResetPasswordPhoneInput
) => {
  return async (dispatch: Dispatch<IFormResetPassord>) => {
    try {
      dispatch({
        type: IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE_LOADING,
      });
      await PUBLIC_API.post("account/password-reset-number/confirm/", {
        ...resetPhone,
      });
      dispatch({
        type: IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE,
        payload: { phone: resetPhone.phone },
      });
      dispatch(
        //@ts-ignore
        toastMessageFunction({
          setOut: true,
          status: true,
          message: "Пароль успешно изменён",
        })
      );
    } catch (e: any) {
      dispatch({
        type: IFormTypesResetPasswordPhone.RESET_PASSWORD_PHONE_ERROR,
        payload: e.message,
      });
      dispatch(
        //@ts-ignore
        toastMessageFunction({
          setOut: true,
          status: false,
          message: "Произошла ошибка",
        })
      );
    }
  };
};

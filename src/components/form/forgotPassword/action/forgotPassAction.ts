import { Dispatch } from "redux";
import { toast } from "react-toastify";

import { PUBLIC_API } from "../../../../api/Index";
import {
  IForgotPasswordTypes,
  IFormForgotPassword,
} from "../interfacesForgotPassword";

export const fetchForgotPassword = (email: string) => {
  return async (dispatch: Dispatch<IFormForgotPassword>) => {
    try {
      dispatch({
        type: IForgotPasswordTypes.FORGOT_LOADING,
      });
      const res = await PUBLIC_API.post("reset_password/", {
        email,
      });
      dispatch({
        type: IForgotPasswordTypes.FORGOT_PASSWORD,
        payload: res.data,
      });
      toast.success("Ссылка для восстановления было отравлено на вашу почту");
    } catch (e: any) {
      dispatch({
        type: IForgotPasswordTypes.FORGOT_ERROR,
        payload: e.message,
      });
      if (
        e.response.data?.email[0] ===
        "We couldn't find an account associated with that email. Please try a different e-mail address."
      ) {
        return toast.error(
          "Мы не смогли найти учетную запись, связанную с этим адресом электронной почты."
        );
      } else {
        return toast.error(e.message);
      }
    }
  };
};

export const fetchForgotPasswordPhone = (
  phone: string,
  successPhoneForgot: () => void
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: IForgotPasswordTypes.FORGOT_LOADING,
      });
      await PUBLIC_API.post("account/password-reset-number/", {
        phone,
      });
      dispatch({
        type: IForgotPasswordTypes.FORGOT_PASSWORD,
        payload: { phone },
      });
      sessionStorage.setItem("phoneNumber", phone);
      successPhoneForgot();
    } catch (e: any) {
      dispatch({
        type: IForgotPasswordTypes.FORGOT_ERROR,
        payload: e.message,
      });
      toast.error(e.message);
    }
  };
};

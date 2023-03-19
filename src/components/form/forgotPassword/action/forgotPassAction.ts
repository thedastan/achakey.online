import { Dispatch } from "redux";
import { toast } from "react-toastify";

import { PUBLIC_API } from "../../../../api/Index";
import { IForgotPassword, IFormsTypes } from "../../formInterfaces";

export const fetchForgotPassword = (email: IForgotPassword) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: IFormsTypes.FORGOT_LOADING,
      });
      const res = await PUBLIC_API.post("reset_password/", {
        ...email,
      });
      dispatch({
        type: IFormsTypes.FORGOT_PASSWORD,
        payload: res.data,
      });
      toast.success("Ссылка для восстановления было отравлено на вашу почту");
    } catch (e: any) {
      if (
        e.response.data?.email[0] ===
        "We couldn't find an account associated with that email. Please try a different e-mail address."
      ) {
        toast.error(
          "Мы не смогли найти учетную запись, связанную с этим адресом электронной почты."
        );
        toast.error("Пожалуйста, попробуйте другой адрес электронной почты.");
      } else {
        toast.error(e.message);
      }
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};

export const fetchForgotPasswordPhone = (phone: IForgotPassword) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: IFormsTypes.FORGOT_LOADING,
      });
      const res = await PUBLIC_API.post("account/password-reset-number/", {
        ...phone,
      });
      dispatch({
        type: IFormsTypes.FORGOT_PASSWORD,
        payload: res.data,
      });
    } catch (e: any) {
      alert(JSON.stringify(e.response.data, null, 2));
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};

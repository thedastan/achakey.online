import { Dispatch } from "redux";

import API from "../../../../api/Index";
import { toastMessageFunction } from "../../../toast-message/action/ActionToast";
import { IFormsTypes, IInputChangePassword } from "../../formInterfaces";

export const fetchChangePassword = (newPass: IInputChangePassword) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_CHANGE_PASSWORD,
      });
      const res = await API.post("account/change-password/", {
        ...newPass,
      });
      dispatch({
        type: IFormsTypes.CHANGE_PASSWORD,
        payload: res.data,
      });
      dispatch(
        //@ts-ignore
        toastMessageFunction({
          setOut: true,
          status: true,
          message: "Пароль успешно изменен",
        })
      );
    } catch (e: any) {
      dispatch({
        type: IFormsTypes.ERROR_CHANGE_PASSWORD,
        payload: "Ошибка!",
      });
      if (e.response.data.old_password[0] === "Wrong password.") {
        return dispatch(
          //@ts-ignore
          toastMessageFunction({
            setOut: true,
            status: false,
            message: "Текущий пароль не верный",
          })
        );
      }
    }
  };
};

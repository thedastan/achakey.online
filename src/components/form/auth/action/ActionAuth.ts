import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../../api/Index";
import { IFormAuth, IFormTypesAuth, IInputAuth } from "../formAuthInterfaces";

export const fetchAuthLogin = (user: IInputAuth) => {
  return async (dispatch: Dispatch<IFormAuth>) => {
    try {
      dispatch({
        type: IFormTypesAuth.LOADING_AUTH,
      });
      const res = await PUBLIC_API.post("account/login/", {
        ...user,
      });
      dispatch({
        type: IFormTypesAuth.LOGIN_USER,
        payload: res.data,
      });
      localStorage.setItem("accessToken", JSON.stringify(res.data.access));
      localStorage.setItem("refreshToken", JSON.stringify(res.data.refresh));
      localStorage.setItem("user-id", `"${res.data.id}"`);
    } catch (e: any) {
      const status = e.response.status;
      if (status >= 400 && status <= 499) {
        dispatch({
          type: IFormTypesAuth.ERROR_AUTH,
          payload: "Не верно указан логин или пароль",
        });
      } else {
        dispatch({
          type: IFormTypesAuth.ERROR_AUTH,
          payload: e.message,
        });
      }
    }
  };
};

export const fetchAuthGoogle = (token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await PUBLIC_API.post(`auth/register-with-google/`, {
        token,
      });
      dispatch({
        type: IFormTypesAuth.LOGIN_USER,
        payload: res.data,
      });
      localStorage.setItem("accessToken", JSON.stringify(res.data.access));
      localStorage.setItem("refreshToken", JSON.stringify(res.data.refresh));
      localStorage.setItem("user-id", `"${res.data.id}"`);
    } catch (e: any) {
      dispatch({
        type: IFormTypesAuth.ERROR_AUTH,
        payload: e.message,
      });
    }
  };
};

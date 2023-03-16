import { Dispatch } from "redux";
import { PUBLIC_API } from "../../../../api/Index";
import { IForms, IFormsTypes, IInputAuth } from "../../formInterfaces";

export const fetchAuthLogin = (user: IInputAuth) => {
  return async (dispatch: Dispatch<IForms>) => {
    try {
      dispatch({
        type: IFormsTypes.LOADING_USER,
      });
      const res = await PUBLIC_API.post("account/login/", {
        ...user,
      });
      dispatch({
        type: IFormsTypes.LOGIN_USER,
        payload: res.data,
      });
      localStorage.setItem("accessToken", JSON.stringify(res.data.access));
      localStorage.setItem("refreshToken", JSON.stringify(res.data.refresh));
      localStorage.setItem("user-id", `"${res.data.id}"`);
      console.log(res.data);
      alert("Добро пожаловать!");
    } catch (e: any) {
      alert(JSON.stringify(e.response.data, null, 2));
      dispatch({
        type: IFormsTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};

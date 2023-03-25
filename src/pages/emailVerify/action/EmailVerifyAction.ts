import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../api/Index";
import { IEmailVerify, IEmailVerifyTypes } from "../EmailVerifyInterface";

export const getEmailVerify = (token: string) => {
  return async (dispatch: Dispatch<IEmailVerify>) => {
    try {
      dispatch({
        type: IEmailVerifyTypes.LOADING_VERIFY,
      });
      const res = await PUBLIC_API.get(`account/email-verify/?token=${token}`);
      dispatch({
        type: IEmailVerifyTypes.EMAIL_VERIFY,
        payload: res.data,
      });
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: IEmailVerifyTypes.ERROR_VERIFY,
        payload: e.message,
      });
    }
  };
};

export const openModalEmailVerify = (openClose: boolean) => {
  return async (dispatch: Dispatch<IEmailVerify>) => {
    try {
      dispatch({
        type: IEmailVerifyTypes.AUTH_MODAL_OPEN,
        payload: openClose,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

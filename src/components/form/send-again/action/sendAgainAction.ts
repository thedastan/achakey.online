import { Dispatch } from "redux";

import { PUBLIC_API } from "../../../../api/Index";

export const sendAgainPhone = (phone: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await PUBLIC_API.post("account/send-again/", {
        phone,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
};

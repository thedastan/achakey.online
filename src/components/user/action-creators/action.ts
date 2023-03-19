import { Dispatch } from "redux";
import API from "../../../api/Index";
import { ActionUser, UserTypes } from "../types";

export const fetchUser = () => {
  return async (dispatch: Dispatch<ActionUser>) => {
    try {
      const response = await API.get(`account/users/`);

      dispatch({
        type: UserTypes.USER,
        payload: response.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const fetchUserDetails = (id: string) => {
  return async (dispatch: Dispatch<ActionUser>) => {
    try {
      const response = await API.get(`account/users/${id}`);
      dispatch({
        type: UserTypes.USER_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

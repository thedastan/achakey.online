import { Dispatch } from "redux";
import API from "../../../api/Index";
import { ActionUser, UserDetails, UserTypes } from "../types";

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
      dispatch({
        type: UserTypes.LOADING_USER,
      });
      const response = await API.get(`account/users/${id}`);
      dispatch({
        type: UserTypes.USER_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      console.error(e);
    } catch (e: any) {
      dispatch({
        type: UserTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};

export const fetchChangeUserFields = (user: UserDetails) => {
  return async (dispatch: Dispatch<ActionUser>) => {
    try {
      dispatch({
        type: UserTypes.LOADING_USER,
      });
      const res = await API.put(`account/users/manager/${user.id}/`, {
        ...user,
      });
      console.log(res);
      dispatch({
        type: UserTypes.USER_DETAILS,
        payload: res.data,
      });
    } catch (e: any) {
      dispatch({
        type: UserTypes.ERROR_USER,
        payload: e.message,
      });
    }
  };
};

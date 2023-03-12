import { Dispatch } from "react";

import API from "../../../api/Index";
import { ActionTypes, OrderPost, OrderTypes } from "../types/order";

export const fetchOrder = () => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const response = await API.get("order");

      dispatch({
        type: OrderTypes.ORDER,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchOrderItem = (id: string) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const response = await API.get(`order/${id}`);

      dispatch({
        type: OrderTypes.ORDER_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchOrderPost = (order: OrderPost) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const response = await API.post(`order/`, order);

      dispatch({
        type: OrderTypes.ORDER_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

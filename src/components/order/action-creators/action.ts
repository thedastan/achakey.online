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

export const fetchOrderItem = (id: number) => {
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

export const fetchOrderPost = (order: any) => {
  return async (dispatch: Dispatch<ActionTypes>) => {
    try {
      const { data } = await API.post(`order/`, order);
      data?.url && window.open(data?.url);

      // await API.delete(`order/delete/${data.order.id}`);

      dispatch({
        type: OrderTypes.ORDER_DETAILS,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchOrderId = (payload: number): ActionTypes => {
  return { type: OrderTypes.ORDER_POST_ID, payload };
};

export const openOrderModal = (payload: boolean): ActionTypes => {
  return {
    type: OrderTypes.OPEN_MODAL_ORDER,
    payload,
  };
};

export const openOrderModalId = (payload: boolean): ActionTypes => {
  return {
    type: OrderTypes.OPEN_MODAL_ORDER_ID,
    payload,
  };
};

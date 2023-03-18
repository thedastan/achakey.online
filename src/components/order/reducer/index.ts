import { ActionTypes, OrderState, OrderTypes } from "../types/order";

const initialState: OrderState = {
  order: [],
  orderDetails: null,
  orderId: 0,
};

export const reducerOrder = (
  state = initialState,
  action: ActionTypes
): OrderState => {
  switch (action.type) {
    case OrderTypes.ORDER:
      return { ...state, order: action.payload };

    case OrderTypes.ORDER_DETAILS:
      return { ...state, orderDetails: action.payload };

    case OrderTypes.ORDER_POST_ID:
      return { ...state, orderId: action.payload };
    default:
      return state;
  }
};

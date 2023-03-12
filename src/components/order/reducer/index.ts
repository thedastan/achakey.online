import { ActionTypes, OrderState, OrderTypes } from "../types/order";

const initialState: OrderState = {
  order: [],
};

export const reducerOrder = (
  state = initialState,
  action: ActionTypes
): OrderState => {
  switch (action.type) {
    case OrderTypes.ORDER:
      return { ...state, order: action.payload };

    default:
      return state;
  }
};

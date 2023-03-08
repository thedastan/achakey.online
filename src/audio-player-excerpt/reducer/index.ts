import { IChangeAction, IChangeState, IChangeTypes } from "../types";

const initialState: IChangeState = {
  change: 0,
};

export const reducerChange = (state = initialState, action: IChangeAction) => {
  switch (action.type) {
    case IChangeTypes.CHANGE:
      return { ...state, change: action.payload };

    default:
      return state;
  }
};

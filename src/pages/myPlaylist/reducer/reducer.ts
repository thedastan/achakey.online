import { BooleanTabAction, BooleanTabTypes, TabBoolean } from "../types";

const initialState: TabBoolean = {
  tabBoolean: true,
};

export const reducerTabBoolean = (
  state = initialState,
  action: BooleanTabAction
) => {
  switch (action.type) {
    case BooleanTabTypes.ALBUM_OR_TRACKS:
      return { ...state, tabBoolean: action.payload };

    default:
      return state;
  }
};

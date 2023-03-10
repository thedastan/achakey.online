import {
  ChangeAction,
  ChangeActionTypes,
  ChangeEventState,
  CurrentIndexAction,
  CurrentIndexActionTypes,
} from "./types";

const initialState: ChangeEventState = {
  event: false,
};

const stateInitial = {
  currentIndex: 0,
};

export const eventReducer = (state = initialState, action: ChangeAction) => {
  switch (action.type) {
    case ChangeActionTypes.EVENT:
      return { ...state, event: action.payload };

    default:
      return state;
  }
};

export const currentIndexReducer = (
  state = stateInitial,
  action: CurrentIndexAction
) => {
  switch (action.type) {
    case CurrentIndexActionTypes.CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };

    default:
      return state;
  }
};

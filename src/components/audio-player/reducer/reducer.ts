import {
  FucntionForPlayerState,
  FunctionForPlayerAction,
  FunctionForPlayerTypes,
} from "./types";

const initialState: FucntionForPlayerState = {
  all_loop: false,
  loop: false,
  next: false,
  prev: false,
  random: false,
};

export const FunctionForMusicReducer = (
  state = initialState,
  action: FunctionForPlayerAction
) => {
  switch (action.type) {
    case FunctionForPlayerTypes.NEXT:
      return { ...state, next: action.payload };
    case FunctionForPlayerTypes.PREV:
      return { ...state, prev: action.payload };
    case FunctionForPlayerTypes.LOOP:
      return { ...state, loop: action.payload };
    case FunctionForPlayerTypes.ALL_LOOP:
      return { ...state, all_loop: action.payload };
    case FunctionForPlayerTypes.RANDOM:
      return { ...state, random: action.payload };

    default:
      return state;
  }
};

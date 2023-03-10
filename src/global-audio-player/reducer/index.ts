import {
  AudioBottomAction,
  AudioBottomTypes,
  IAudioBottomState,
} from "../types";

const initialState: IAudioBottomState = {
  changeTime: 0,
  changeVolume: 50,
  allLoop: false,
  loop: false,
};

export const reducerChangeTimePlayerBottom = (
  state = initialState,
  action: AudioBottomAction
) => {
  switch (action.type) {
    case AudioBottomTypes.CHANGE_TIME:
      return { ...state, changeTime: action.payload };
    case AudioBottomTypes.CHANGE_VOLUME:
      return { ...state, changeVolume: action.payload };
    case AudioBottomTypes.ALL_LOOP:
      return { ...state, allLoop: action.payload };
    case AudioBottomTypes.LOOP:
      return { ...state, loop: action.payload };
    default:
      return state;
  }
};

import { AudioBottomAction, AudioBottomTypes } from "../types";

export const changeTimeAction = (payload: number): AudioBottomAction => {
  return { type: AudioBottomTypes.CHANGE_TIME, payload };
};

export const changeVolumeAction = (payload: number): AudioBottomAction => {
  return { type: AudioBottomTypes.CHANGE_VOLUME, payload };
};

export const loopAction = (payload: boolean): AudioBottomAction => {
  return { type: AudioBottomTypes.LOOP, payload };
};

export const allLoopAction = (payload: boolean): AudioBottomAction => {
  return { type: AudioBottomTypes.ALL_LOOP, payload };
};

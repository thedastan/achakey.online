import { FunctionForPlayerAction, FunctionForPlayerTypes } from "../types";

export const nextMusic = (payload: boolean): FunctionForPlayerAction => {
  return { type: FunctionForPlayerTypes.NEXT, payload };
};

export const prevMusic = (payload: boolean): FunctionForPlayerAction => {
  return { type: FunctionForPlayerTypes.PREV, payload };
};

export const allLoopMusic = (payload: boolean): FunctionForPlayerAction => {
  return { type: FunctionForPlayerTypes.ALL_LOOP, payload };
};

export const loopActive = (payload: boolean): FunctionForPlayerAction => {
  return { type: FunctionForPlayerTypes.LOOP, payload };
};

export const RandomMusicActive = (
  payload: boolean
): FunctionForPlayerAction => {
  return { type: FunctionForPlayerTypes.RANDOM, payload };
};

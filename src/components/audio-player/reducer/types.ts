export interface FucntionForPlayerState {
  next: boolean;
  prev: boolean;
  loop: boolean;
  all_loop: boolean;
  random: boolean;
}

export enum FunctionForPlayerTypes {
  NEXT = "NEXT",
  PREV = "PREV",
  LOOP = "LOOP",
  ALL_LOOP = "ALL_LOOP",
  RANDOM = "RANDOM",
}

interface NextAction {
  type: FunctionForPlayerTypes.NEXT;
  payload: boolean;
}

interface PrevAction {
  type: FunctionForPlayerTypes.PREV;
  payload: boolean;
}

interface LoopAction {
  type: FunctionForPlayerTypes.LOOP;
  payload: boolean;
}

interface AllLoopAction {
  type: FunctionForPlayerTypes.ALL_LOOP;
  payload: boolean;
}

interface RandomMusicAction {
  type: FunctionForPlayerTypes.RANDOM;
  payload: boolean;
}

export type FunctionForPlayerAction =
  | NextAction
  | PrevAction
  | LoopAction
  | AllLoopAction
  | RandomMusicAction;

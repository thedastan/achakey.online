export interface ChangeEventState {
  event: boolean;
}

export interface CurrentIndexState {
  currentIndex: number;
}

export enum ChangeActionTypes {
  EVENT = "EVENT",
}

export enum CurrentIndexActionTypes {
  CURRENT_INDEX = "CURRENT_INDEX",
}

interface ChangeEvent {
  type: ChangeActionTypes.EVENT;
  payload: boolean;
}

interface CurrentIndex {
  type: CurrentIndexActionTypes.CURRENT_INDEX;
  payload: number;
}

export type ChangeAction = ChangeEvent;

export type CurrentIndexAction = CurrentIndex;

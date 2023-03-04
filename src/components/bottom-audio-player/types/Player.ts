import { ITrack } from "../../../redux/types/Track";

export interface PlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum PlayerActionTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
}

interface PlayAction {
  type: PlayerActionTypes.PLAY;
}
interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}
interface SetActiveAction {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: ITrack;
}
interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}
interface SetCurrentTime {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}
interface SetVolume {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

export type PlayerAction =
  | PlayAction
  | PauseAction
  | SetActiveAction
  | SetCurrentTime
  | SetDurationAction
  | SetVolume;

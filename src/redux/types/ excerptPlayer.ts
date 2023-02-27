import { ITrack } from "./Track";

export interface ExcerptPlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum ExcerptPlayerTypes {
  EXCERPT_PLAY = "EXCERPT_PLAY",
  EXCERPT_PAUSE = "EXCERPT_PAUSE",
  EXCERPT_SET_ACTIVE = "EXCERPT_SET_ACTIVE",
  EXCERPT_SET_DURATION = "EXCERPT_SET_DURATION",
  EXCERPT_SET_CURRENT_TIME = "EXCERPT_SET_CURRENT_TIME",
  EXCERPT_SET_VOLUME = "EXCERPT_SET_VOLUME",
}

interface ExcerptPlayAction {
  type: ExcerptPlayerTypes.EXCERPT_PLAY;
}

interface ExcerptPauseAction {
  type: ExcerptPlayerTypes.EXCERPT_PAUSE;
}

interface ExcerptDurationAction {
  type: ExcerptPlayerTypes.EXCERPT_SET_DURATION;
  payload: number;
}

interface ExcerptCurrentTimeAction {
  type: ExcerptPlayerTypes.EXCERPT_SET_CURRENT_TIME;
  payload: number;
}

interface ExcerptVolumeAction {
  type: ExcerptPlayerTypes.EXCERPT_SET_VOLUME;
  payload: number;
}

interface ExcerptActiveAction {
  type: ExcerptPlayerTypes.EXCERPT_SET_ACTIVE;
  payload: ITrack;
}

export type ExcerptActionPlayer =
  | ExcerptActiveAction
  | ExcerptCurrentTimeAction
  | ExcerptDurationAction
  | ExcerptPauseAction
  | ExcerptPlayAction
  | ExcerptVolumeAction;

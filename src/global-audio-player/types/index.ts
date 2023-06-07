export interface IAudioBottomState {
  changeTime: number;
  changeVolume: number;
  loop: boolean;
  allLoop: boolean;
  loading: boolean;
}

export enum AudioBottomTypes {
  CHANGE_TIME = "CHANGE_TIME",
  CHANGE_VOLUME = "CHANGE_VOLUME",
  LOOP = "LOOP",
  ALL_LOOP = "ALL_LOOP",
  LOADING_MUSIC = "LOADING_MUSIC",
}

interface AudioBottomTimeActions {
  type: AudioBottomTypes.CHANGE_TIME;
  payload: number;
}

interface AudioBottomVolumeActions {
  type: AudioBottomTypes.CHANGE_VOLUME;
  payload: number;
}

interface AudioBottomLoopActions {
  type: AudioBottomTypes.LOOP;
  payload: boolean;
}

interface AudioBottomAllLoopActions {
  type: AudioBottomTypes.ALL_LOOP;
  payload: boolean;
}

interface AudioLoading {
  type: AudioBottomTypes.LOADING_MUSIC;
  payload: boolean;
}

export type AudioBottomAction =
  | AudioBottomTimeActions
  | AudioBottomVolumeActions
  | AudioBottomAllLoopActions
  | AudioBottomLoopActions
  | AudioLoading;

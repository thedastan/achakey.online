import { IAlbums, IMyTrack, ITrack } from "../../../redux/types";
import { PlayerAction, PlayerActionTypes } from "../types/Player";

export const playTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PLAY };
};

export const pauseTrack = (): PlayerAction => {
  return { type: PlayerActionTypes.PAUSE };
};

export const activeTrack = (payload: IMyTrack): PlayerAction => {
  return { type: PlayerActionTypes.SET_ACTIVE, payload };
};

export const setDuration = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_DURATION, payload };
};

export const setVolume = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_VOLUME, payload };
};

export const setCurrentTime = (payload: number): PlayerAction => {
  return { type: PlayerActionTypes.SET_CURRENT_TIME, payload };
};

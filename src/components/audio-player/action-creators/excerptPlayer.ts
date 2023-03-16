import { ITrack } from "../../../redux/types";
import {
  ExcerptActionPlayer,
  ExcerptPlayerTypes,
} from "../types/ExcerptPlayer";

export const excerptPlayAction = (): ExcerptActionPlayer => {
  return { type: ExcerptPlayerTypes.EXCERPT_PLAY };
};

export const excerptPauseAction = (): ExcerptActionPlayer => {
  return { type: ExcerptPlayerTypes.EXCERPT_PAUSE };
};

export const excerptForAlbumAction = (
  payload: boolean
): ExcerptActionPlayer => {
  return { type: ExcerptPlayerTypes.EXCERPT_FOR_ALBUM, payload };
};

export const excerptCurrentTimeAction = (
  payload: number
): ExcerptActionPlayer => {
  return { type: ExcerptPlayerTypes.EXCERPT_SET_CURRENT_TIME, payload };
};

export const excerptDurationAction = (payload: number) => {
  return { type: ExcerptPlayerTypes.EXCERPT_SET_DURATION, payload };
};

export const excerptActiveAction = (payload: ITrack): ExcerptActionPlayer => {
  return { type: ExcerptPlayerTypes.EXCERPT_SET_ACTIVE, payload };
};

export const excerptVolumeAction = (payload: number): ExcerptActionPlayer => {
  return { type: ExcerptPlayerTypes.EXCERPT_SET_VOLUME, payload };
};

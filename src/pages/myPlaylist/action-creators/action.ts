import { BooleanTabAction, BooleanTabTypes } from "../types";

export const tabBooleanAction = (payload: boolean): BooleanTabAction => {
  return { type: BooleanTabTypes.ALBUM_OR_TRACKS, payload };
};

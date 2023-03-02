export interface TabBoolean {
  tabBoolean: boolean;
}

export enum BooleanTabTypes {
  ALBUM_OR_TRACKS = "ALBUM_OR_TRACKS",
}

interface BooleanTab {
  type: BooleanTabTypes.ALBUM_OR_TRACKS;
  payload: boolean;
}

export type BooleanTabAction = BooleanTab;

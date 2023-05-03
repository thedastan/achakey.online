export const enum IndexForAlbums {
  ALBUM_INDEX = "ALBUM_INDEX",
  ALBUM_INDEX_EXCERPT = "ALBUM_INDEX_EXCERPT",
}

export interface StateIndexForAlbums {
  album: number;
  albumForExcerpt: number;
}

interface ActionIndexForAlbums {
  type: IndexForAlbums.ALBUM_INDEX;
  payload: number;
}

interface ActionIndexForExcerptAlbums {
  type: IndexForAlbums.ALBUM_INDEX_EXCERPT;
  payload: number;
}

export type ActionsIndexsForAlbums =
  | ActionIndexForAlbums
  | ActionIndexForExcerptAlbums;

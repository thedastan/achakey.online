import { ActionsIndexsForAlbums, IndexForAlbums } from "../types";

export const indexForAlbums = (payload: number): ActionsIndexsForAlbums => {
  return { type: IndexForAlbums.ALBUM_INDEX, payload };
};

export const indexForExcerptAlbums = (
  payload: number
): ActionsIndexsForAlbums => {
  return { type: IndexForAlbums.ALBUM_INDEX_EXCERPT, payload };
};

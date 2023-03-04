import axios from "axios";
import { Dispatch } from "react";
import { AlbumsAction, IAlbumsActionTypes } from "../types/Album";

export const fetchAlbums = () => {
  return async (dispatch: Dispatch<AlbumsAction>) => {
    try {
      const response = await axios.get("");
      dispatch({
        type: IAlbumsActionTypes.FETCH_ALBUMS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: IAlbumsActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Что то пошло не так",
      });
    }
  };
};

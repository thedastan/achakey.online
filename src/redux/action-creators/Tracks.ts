import axios from "axios";
import { Dispatch } from "react";
import { API_ADDRESS } from "../../api/Index";
import { ActionTypes, TypeAction } from "../types";

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TypeAction>) => {
    try {
      const response = await axios.get(`${API_ADDRESS}music/`);
      dispatch({ type: ActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({
        type: ActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};

export const fetchAlbums = () => {
  return async (dispatch: Dispatch<TypeAction>) => {
    try {
      const response = await axios.get(`${API_ADDRESS}playlist/`);
      dispatch({
        type: ActionTypes.FETCH_ALBUMS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Что то пошло не так",
      });
    }
  };
};

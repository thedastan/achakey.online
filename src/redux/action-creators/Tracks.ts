import axios from "axios";
import { Dispatch } from "react";
import API, { API_ADDRESS } from "../../api/Index";
import { ActionTypes, TypeAction } from "../types";

const setLoading = (dispatch: Dispatch<TypeAction>, loading: boolean) => {
  dispatch({ type: ActionTypes.FETCH_LOADER, payload: loading });
};

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TypeAction>) => {
    try {
      setLoading(dispatch, true);
      const response = await axios.get(`${API_ADDRESS}music/`);
      setLoading(dispatch, false);

      dispatch({ type: ActionTypes.FETCH_TRACKS, payload: response.data });
    } catch (e) {
      setLoading(dispatch, false);
      dispatch({
        type: ActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};

export const fetchTrack = (id: string) => {
  return async (dispatch: Dispatch<TypeAction>) => {
    try {
      dispatch({ type: ActionTypes.FETCH_LOADER, payload: true });

      const response = await API.get(`music/${id}`);

      setLoading(dispatch, false);
      dispatch({
        type: ActionTypes.FETCH_DETAILS_TRACK,
        payload: response.data,
      });
    } catch (e) {
      setLoading(dispatch, false);
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
      setLoading(dispatch, true);

      const response = await axios.get(`${API_ADDRESS}album/`);
      setLoading(dispatch, false);

      dispatch({
        type: ActionTypes.FETCH_ALBUMS,
        payload: response.data,
      });
    } catch (e) {
      setLoading(dispatch, false);
      dispatch({
        type: ActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Что то пошло не так",
      });
    }
  };
};

export const fetchMyTracks = () => {
  return async (dispatch: Dispatch<TypeAction>) => {
    try {
      dispatch({ type: ActionTypes.FETCH_LOADER, payload: true });

      const response = await API.get(`my_playlist_music/`);

      dispatch({ type: ActionTypes.FETCH_LOADER, payload: false });
      dispatch({ type: ActionTypes.FETCH_MY_TRACKS, payload: response.data });
    } catch (e) {
      dispatch({ type: ActionTypes.FETCH_LOADER, payload: false });

      dispatch({
        type: ActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};

export const fetchMyAlbums = () => {
  return async (dispatch: Dispatch<TypeAction>) => {
    try {
      dispatch({ type: ActionTypes.FETCH_LOADER, payload: true });
      const response = await API.get(`my_playlist_album/`);

      dispatch({ type: ActionTypes.FETCH_LOADER, payload: false });
      dispatch({
        type: ActionTypes.FETCH_MY_ALBUMS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({ type: ActionTypes.FETCH_LOADER, payload: false });

      dispatch({
        type: ActionTypes.FETCH_ALBUMS_ERROR,
        payload: "Что то пошло не так",
      });
    }
  };
};

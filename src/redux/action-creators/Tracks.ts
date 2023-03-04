import axios from "axios";
import { Dispatch } from "react";
import { ITrackActionTypes, TrackAction } from "../types/Track";

export const getTrackAction = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = axios.get("http://138.68.108.37/music");
      dispatch({
        type: ITrackActionTypes.FETCH_TRACKS,
        payload: (await response).data,
      });
    } catch {
      dispatch({
        type: ITrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Что то пошло не так",
      });
    }
  };
};

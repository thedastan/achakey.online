import { Dispatch } from "react";
import { ITrackActionTypes, TrackAction } from "../types/Track";
import axios from "axios";

export const fetchTrack = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get("");
      dispatch({
        type: ITrackActionTypes.FETCH_TRACKS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ITrackActionTypes.FETCH_TRACKS_ERROR,
        payload: "Произошла ошибка при загрузке треков",
      });
    }
  };
};
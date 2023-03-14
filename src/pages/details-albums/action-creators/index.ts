import axios from "axios";
import { Dispatch } from "redux";
import { API_ADDRESS } from "../../../api/Index";
import { ActionsDetailsAlbum, ActionTypes } from "../types";

export const fetchAlbumsDetails = (id: string | number) => {
  return async (dispatch: Dispatch<ActionsDetailsAlbum>) => {
    try {
      const response = await axios.get(`${API_ADDRESS}album/${id}`);

      dispatch({
        type: ActionTypes.FETCH_ALBUMS_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ActionTypes.FETCH_ALBUMS_ERROR_DETAILS,
        payload: "Страница не найден",
      });
    }
  };
};

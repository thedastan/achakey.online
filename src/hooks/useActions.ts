import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import actionCreators from "../components/bottom-audio-player/action-creators";
import actionCreatorsExcerpt from "../components/audio-player/action-creators";
import actionTracks from "../redux/action-creators/index";
import { useAppDispatch } from "./Index";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};

export const useExcerpAction = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionCreatorsExcerpt, dispatch);
};

export const useTracksAction = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionTracks, dispatch);
};

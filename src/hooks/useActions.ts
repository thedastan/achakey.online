import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import actionFunctionForMusic from "../components/audio-player/reducer/action-creators";
import actionCreators from "../components/bottom-audio-player/action-creators";
import actionCreatorsExcerpt from "../redux/action-creators";
import { useAppDispatch } from "./Index";

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};

export const useFanctionForMusic = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionFunctionForMusic, dispatch);
};

export const useExcerpAction = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actionCreatorsExcerpt, dispatch);
};

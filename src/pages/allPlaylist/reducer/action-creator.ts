import {
  ChangeAction,
  ChangeActionTypes,
  CurrentIndexAction,
  CurrentIndexActionTypes,
} from "./types";

export const eventChange = (payload: boolean): ChangeAction => {
  return { type: ChangeActionTypes.EVENT, payload };
};

export const currentIndexAction = (payload: number): CurrentIndexAction => {
  return { type: CurrentIndexActionTypes.CURRENT_INDEX, payload };
};

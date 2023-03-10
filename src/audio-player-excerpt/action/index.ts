import { IChangeAction, IChangeTypes } from "../types";

export const changeAction = (payload: number): IChangeAction => {
  return { type: IChangeTypes.CHANGE, payload };
};

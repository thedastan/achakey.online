export interface IChangeState {
  change: number;
}

export enum IChangeTypes {
  CHANGE = "CHANGE",
}

interface IChangeTypesAction {
  type: IChangeTypes.CHANGE;
  payload: number;
}

export type IChangeAction = IChangeTypesAction;

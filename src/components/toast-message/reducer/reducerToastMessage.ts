import {
  IStateToastMessage,
  IToastMessages,
  IToastMessageType,
} from "../InterfaceToastMessage";

const initialState: IStateToastMessage = {
  toast: { message: "", status: false, setOut: false },
};

export const reducerToasrMessage = (
  state = initialState,
  action: IToastMessages
) => {
  switch (action.type) {
    case IToastMessageType.TOAST_MESSAGE: {
      return { ...state, toast: action.payload };
    }
    default: {
      return state;
    }
  }
};

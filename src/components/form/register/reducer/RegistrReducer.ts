import { IForms, IFormsTypes, IStateRegister } from "../../formInterfaces";

const initialState = {
  loading: false,
  error: "",
  registerUser: {},
} as IStateRegister;

export const registerReducer = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.LOADING_USER: {
      return { ...state, loading: true };
    }
    case IFormsTypes.REGISTER_USER: {
      return { ...state, registerUser: action.payload, loading: false };
    }
    case IFormsTypes.ERROR_USER: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
};

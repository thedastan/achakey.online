import { IForms, IFormsTypes, IStateRegister } from "../../formInterfaces";

const initialState = {
  loading: false,
  error: "",
  registerUser: {},
  phoneNumber: "",
} as IStateRegister;

export const registerReducer = (state = initialState, action: IForms) => {
  switch (action.type) {
    case IFormsTypes.LOADING_REGISTER: {
      return { ...state, loading: true };
    }
    case IFormsTypes.REGISTER_USER: {
      return {
        ...state,
        loading: false,
        registerUser: action.payload,
      };
    }
    case IFormsTypes.PHONE_NUMBER_REGISTER: {
      return {
        ...state,
        phoneNumber: action.payload,
      };
    }
    case IFormsTypes.ERROR_REGISTER: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        phoneNumber: "",
      };
    }
    default:
      return state;
  }
};

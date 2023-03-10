export const enum UserTypes {
  USER = "USER",
  USER_DETAILS = "USER_DETAILS",
}

export interface UserDetails {
  id?: string;
  email?: string;
  phone?: string;
}

export interface UserState {
  user: UserDetails[];
  userDetails: UserDetails;
}

interface ActionUsers {
  type: UserTypes.USER;
  payload: UserDetails[];
}

interface ActionUserDetails {
  type: UserTypes.USER_DETAILS;
  payload: UserDetails;
}

export type ActionUser = ActionUsers | ActionUserDetails;

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS


} from 'Constants/actionTypes';

export const deleteUser = (user, history) => ({
  type: DELETE_USER,
  payload: { user, history }
});

export const deleteUserSuccess = (user) => ({
  type: DELETE_USER_SUCCESS,
  payload: user
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
});

export const getUserlist = () => ({
  type: GET_USER_LIST,
});

export const getUserlistSuccess = (userlist) => ({
  type: GET_USER_LIST_SUCCESS,
  payload: userlist
});

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history }
})
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
})

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload : {history}
});
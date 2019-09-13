import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  user: localStorage.getItem("user_id"),
  loading: false,
  userList: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log('Login_user');
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      console.log('Login_success');
      //notify.success('Login Success');
      return { ...state, loading: false, user: action.payload };
    case GET_USER_LIST:
      return {...state, loading: true};
    case GET_USER_LIST_SUCCESS:
      return {...state, userList: action.payload, loading:false}
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      let added = state.userList
      added.push(action.payload)
      return { ...state, userList: added, loading:false };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return { ...state };
  }
};

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  UPDATE_PIN, 
  UPDATE_PIN_SUCCESS,
  CREATE_PIN,
  CREATE_PIN_SUCCESS,
  GET_PIN,
  GET_PIN_SUCCESS,
  RESET_PIN,
  RESET_PIN_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  user: localStorage.getItem("user_id"),
  loading: false,
  userList: [],
  pin: ''
};

export default (state = INIT_STATE, action) => {
  let newList;
  switch (action.type) {
    case LOGIN_USER:
      console.log('Login_user');
      return { ...state, loading: true };
    case DELETE_USER:
      return { ...state };
    case DELETE_USER_SUCCESS:
      newList = state.userList;
      for(let index in newList) 
        if(newList[index]._id == action.payload._id){
          newList.splice(index, 1);
          break;
        }
      return { ...state, userList: newList, loading: true };
    case RESET_PIN:
      return { ...state };
    case RESET_PIN_SUCCESS:
      return { ...state, pin: ''};
    case UPDATE_PIN:
      return { ...state };
    case UPDATE_PIN_SUCCESS:
      console.log('here is pin', action.payload);
      return { ...state, pin: action.payload.pin};
    case CREATE_PIN:
      return { ...state };
    case CREATE_PIN_SUCCESS:
      return { ...state, pin: action.payload.pin};
    case GET_PIN:
      return { ...state };
    case GET_PIN_SUCCESS:
      return { ...state, pin: action.payload.pin};
    case UPDATE_USER:
      return { ...state };
    case UPDATE_USER_SUCCESS:
      newList = state.userList;
      for(let index in newList) 
        if(newList[index]._id == action.payload._id){
          newList[index] = action.payload;
          break;
        }
      return { ...state, userList: newList, loading: true };
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

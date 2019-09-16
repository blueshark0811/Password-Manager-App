
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../firebase';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    GET_USER_LIST,
    UPDATE_USER,
    DELETE_USER
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
    registerUserSuccess,
    getUserlistSuccess,
    updateUserSuccess,
    deleteUserSuccess
} from './actions';
import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : 'http://45.63.27.167:4040'

const loginWithEmailPasswordAsync = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password)
        .then(authUser => authUser)
        .catch(error => error);



function* loginWithEmailPassword({ payload }) {
    const { email, password } = payload.user;
    const { history } = payload;
    try {
        // const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
        console.log(email, password)
        if (email == 'admin' && password == 'admin') {
            localStorage.setItem('user_id', 'admin');
            yield put(loginUserSuccess({email: 'admin', password: 'admin'}));
            history.push('/');
        } else {
            // catch throw
            console.log('login failed :')
        }
    } catch (error) {
        // catch throw
        console.log('login error : ', error)
    }
}

const registerWithEmailPasswordAsync = async (user) =>
    await axios.post(`${API_URL}/api/users/`, user)
    .then( authUser => authUser )
    .catch( error => error);

function* registerWithEmailPassword({ payload }) {
    const { history } = payload;
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, payload.user);
        if (registerUser.data._id) {
            yield put(registerUserSuccess(registerUser.data));
            history.push('/');
        } else {
            // catch throw
            console.log('register failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}



const logoutAsync = async (history) => {
    await auth.signOut().then(authUser => authUser).catch(error => error);
    history.push('/')
}

function* logout({payload}) {
    const { history } = payload
    try {
        yield call(logoutAsync,history);
        localStorage.removeItem('user_id');
    } catch (error) {
    }
}

const getuserlistAsync = async (user) =>
    await axios.get(`${API_URL}/api/users/`)
    .then( userlist => userlist )
    .catch( error => error);

function* getuserlist() {
    try {
        const userlist = yield call(getuserlistAsync);
        if (userlist.data) {
            console.log(userlist.data);
            yield put(getUserlistSuccess(userlist.data));
        } else {
            // catch throw
            console.log('get user list failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}

const updateuserAsync = async (user) => {
    let user_id = user._id;
    delete user._id;
    delete user.data;
    return await axios.put(`${API_URL}/api/users/${user_id}`, user)
    .then( updateduser => updateduser )
    .catch( error => error);
}

function* update_user(user) {
    try {
        const updateduser = yield call(updateuserAsync, user.payload);
        if (updateduser.data) {
            yield put(updateUserSuccess(updateduser.data));
        } else {
            // catch throw
            console.log('get user list failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}


const deleteuserAsync = async (id) => {
    return await axios.delete(`${API_URL}/api/users/${id}`)
    .then( deleteuser => deleteuser )
    .catch( error => error);
}

function* delete_user({ payload }) {
    const { history } = payload
    console.log(payload);
    try {
        const deletedUser = yield call(deleteuserAsync, payload.user);
        if (deletedUser.data) {
            console.log('deletedUser:', deletedUser.data);
            yield put(deleteUserSuccess(deletedUser.data));
            history.push('/');
        } else {
            // catch throw
            console.log('get user list failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}

export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

export function* watchGetUserList() {
    yield takeEvery(GET_USER_LIST, getuserlist);
}

export function* watchUpdateUser() {
    yield takeEvery(UPDATE_USER, update_user);
}

export function* watchDeleteUser() {
    yield takeEvery(DELETE_USER, delete_user);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchGetUserList),
        fork(watchUpdateUser),
        fork(watchDeleteUser)

    ]);
}
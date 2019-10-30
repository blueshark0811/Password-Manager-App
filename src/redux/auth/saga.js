
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from '../../firebase';
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    GET_USER_LIST,
    UPDATE_USER,
    DELETE_USER,
    CREATE_PIN,
    UPDATE_PIN,
    GET_PIN,
    RESET_PIN
} from 'Constants/actionTypes';

import {
    loginUserSuccess,
    registerUserSuccess,
    getUserlistSuccess,
    updateUserSuccess,
    deleteUserSuccess,
    createPinSuccess,
    updatePinSuccess,
    getPinSuccess,
    resetPinSuccess
} from './actions';
import axios from 'axios';
const API_URL = process.env.NODE_ENV === 'development' ? 'https://localhost:4040/api/users/' : 'https://api.restaurantreview.io/pm/users/'

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
    await axios.post(`${API_URL}`, user)
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
    await axios.get(`${API_URL}`)
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
    return await axios.put(`${API_URL}${user_id}`, user)
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
            console.log('update failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}


const deleteuserAsync = async (id) => {
    return await axios.delete(`${API_URL}${id}`)
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
            console.log('delete user failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}


const createpinAsync = async (payload) => {
    return await axios.post(`${API_URL}pin/create`, payload)
    .then( createdPin => createdPin )
    .catch( error => error);
}

function* create_pin({ payload }) {
    try {
        const createdPin = yield call(createpinAsync, payload);
        if (createdPin.data) {
            yield put(createPinSuccess(createdPin.data));
        } else {
            // catch throw
            console.log('create pin failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}
const updatepinAsync = async (payload) => {
    return await axios.post(`${API_URL}pin/update`, payload)
    .then( updatepin => updatepin )
    .catch( error => error);
}

function* update_pin({ payload }) {
    console.log(payload);
    try {
        const updatepin = yield call(updatepinAsync, payload);
        if (updatepin.data) {
            yield put(updatePinSuccess(updatepin.data));
        } else {
            // catch throw
            console.log('update pin failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}

const getpinAsync = async () => {
    return await axios.get(`${API_URL}pin/get`)
    .then( pin => pin )
    .catch( error => error);
}

function* get_pin() {
    try {
        const pin = yield call(getpinAsync);
        if (pin.data) {
            yield put(getPinSuccess(pin.data));
        } else {
            // catch throw
            console.log('get pin failed')
        }
    } catch (error) {
        // catch throw
        console.log('register error : ', error)
    }
}


const resetpinAsync = async () => {
    return await axios.delete(`${API_URL}pin/reset`)
    .then( pin => pin )
    .catch( error => error);
}

function* reset_pin() {
    try {
        const pin = yield call(resetpinAsync);
        if (pin.data) {
            yield put(resetPinSuccess());
        } else {
            // catch throw
            console.log('reset pin list failed')
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

export function* watchCreatePin() {
    yield takeEvery(CREATE_PIN, create_pin);
}

export function* watchUpdatePin() {
    yield takeEvery(UPDATE_PIN, update_pin);
}

export function* watchGetPin() {
    yield takeEvery(GET_PIN, get_pin);
}

export function* watchResetPin() {
    yield takeEvery(RESET_PIN, reset_pin);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchGetUserList),
        fork(watchUpdateUser),
        fork(watchDeleteUser),
        fork(watchCreatePin),
        fork(watchUpdatePin),
        fork(watchGetPin),
        fork(watchResetPin)
    ]);
}
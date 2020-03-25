import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const [JOIN, JOIN_SUCCESS, JOIN_FAILURE] = createRequestActionTypes(
  'user/JOIN',
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'user/LOGIN',
);
const INIT_JOINSUCCESS = 'user/INIT_JOINSUCCESS';
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = user => ({ type: TEMP_SET_USER, payload: user });
export const check = () => ({ type: CHECK });
export const join = user => ({ type: JOIN, payload: user });
export const initJoinSuccess = () => ({ type: INIT_JOINSUCCESS });
export const login = user => ({ type: LOGIN, payload: user });
export const logout = () => ({ type: LOGOUT });

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); // localStorage 에서 user 제거하고
  } catch (e) {
    console.log('localStorage is not working');
  }
}
const joinSaga = createRequestSaga(JOIN, authAPI.join);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

function* logoutSaga() {
  try {
    yield call(authAPI.logout); // logout API 호출
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log('localStorage is not working!');
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(JOIN, joinSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
  err: null,
  joinSuccess: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case TEMP_SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CHECK_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        checkError: null,
        err: null,
        joinSuccess: null,
      };
    case CHECK_FAILURE:
    case LOGIN_FAILURE:
    case JOIN_FAILURE:
      return {
        ...state,
        user: null,
        checkError: action.error,
        err: action.payload,
      };
    case INIT_JOINSUCCESS:
      return {
        ...state,
        joinSuccess: null,
      };
    case JOIN_SUCCESS:
      return {
        ...state,
        joinSuccess: action.payload.joinSuccess,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

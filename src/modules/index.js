import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import posts, { postsSaga } from './posts';
import post, { postSaga } from './post';
import user, { userSaga } from './user';
import loading from './loading';
import postEdit from './postEdit';

const rootReducer = combineReducers({
  loading,
  posts,
  user,
  post,
  postEdit,
});

export function* rootSaga() {
  yield all([userSaga(), postsSaga(), postSaga()]);
}

export default rootReducer;

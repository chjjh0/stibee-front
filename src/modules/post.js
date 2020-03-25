import { takeLatest } from 'redux-saga/effects';
import * as postAPI from '../lib/api/post';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { call, put } from 'redux-saga/effects';
import { changeAll } from './postEdit';

const [SET_POST, SET_POST_SUCCESS, SET_POST_FAILURE] = createRequestActionTypes(
  'post/SET_POST',
);
const SET_POSTFOREDIT = 'post/SET_POSTFOREDIT';

export const setPost = postId => ({ type: SET_POST, payload: postId });
export const setPostForEdit = postId => ({
  type: SET_POSTFOREDIT,
  payload: postId,
});

// saga func
const setPostSaga = createRequestSaga(SET_POST, postAPI.fetchPost);
function* setPostForEditSaga(action) {
  try {
    const post = yield call(postAPI.fetchPost, action.payload);
    const {
      title,
      mdCont,
      htmlCont,
      screenshot,
      tags,
      colors,
    } = post.data.post;

    yield put(
      changeAll({
        title,
        cont: { mdCont, htmlCont },
        screenshot,
        tags,
        colors,
      }),
    );
  } catch (e) {
    yield put({
      type: SET_POST_FAILURE,
      payload: e.response ? e.response : e,
      error: true,
    });
  }
}

// rootSaga
export function* postSaga() {
  yield takeLatest(SET_POST, setPostSaga);
  yield takeLatest(SET_POSTFOREDIT, setPostForEditSaga);
}

const initialState = {
  // posts와는 다르게 사용할 기본값 정의
  // postviewer에 처음 들어가면 dispatch 전이라
  // 기본값이 null일 경우 title, htmlCont 등 각각을 비구조화 할당하지 못함
  post: {
    title: '',
    mdCont: '',
    htmlCont: '',
    tags: [],
    colors: [],
  },
  error: null,
  errorMsg: null,
};

// reducer
export default function post(state = initialState, action) {
  switch (action.type) {
    case SET_POST_SUCCESS:
      return {
        ...state,
        post: action.payload.post,
        error: null,
        errorMsg: null,
      };
    // 포스트가 없을 때는 post를 비워줘야 함
    case SET_POST_FAILURE:
      return {
        ...state,
        post: null,
        error: action.error,
        errorMsg: action.payload,
      };

    // 더보기할 데이터가 없을 때는 posts는 남겨줘야 함
    default:
      return state;
  }
}

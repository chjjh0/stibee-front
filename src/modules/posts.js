import { takeLatest } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const [
  SET_POSTS,
  SET_POSTS_SUCCESS,
  SET_POSTS_FAILURE,
] = createRequestActionTypes('posts/SET_POSTS');
const [
  SET_MOREPOSTS,
  SET_MOREPOSTS_SUCCESS,
  SET_MOREPOSTS_FAILURE,
] = createRequestActionTypes('posts/SET_MOREPOSTS');
const [
  SET_MOREPOSTSBYTAG,
  SET_MOREPOSTSBYTAG_SUCCESS,
  SET_MOREPOSTSBYTAG_FAILURE,
] = createRequestActionTypes('posts/SET_MOREPOSTSBYTAG');
const [
  SET_POSTSBYTAG,
  SET_POSTSBYTAG_SUCCESS,
  SET_POSTSBYTAG_FAILURE,
] = createRequestActionTypes('posts/SET_POSTBYTAG');
const SET_TAG = 'posts/SET_TAG';
const DELETE_POST = 'post/DELETE_POST';

export const setPosts = pageNum => ({ type: SET_POSTS, payload: pageNum });
export const setMorePosts = pageNum => ({
  type: SET_MOREPOSTS,
  payload: pageNum,
});
export const setMorePostsByTag = (pageNum, selectedTag) => ({
  type: SET_MOREPOSTSBYTAG,
  payload: { pageNum, selectedTag },
});
export const setPostsByTag = (pageNum, selectedTag) => ({
  type: SET_POSTSBYTAG,
  payload: { pageNum, selectedTag },
});
export const setTag = tag => ({ type: SET_TAG, tag });
export const deletePost = postId => ({ type: DELETE_POST, postId });

// saga func
const setPostsSaga = createRequestSaga(SET_POSTS, postsAPI.setPosts);
const setPostsByTagSaga = createRequestSaga(
  SET_POSTSBYTAG,
  postsAPI.setPostsByTag,
);
const setMorePostsSaga = createRequestSaga(SET_MOREPOSTS, postsAPI.setPosts);
const setMorePostsByTagSaga = createRequestSaga(
  SET_MOREPOSTS,
  postsAPI.setPostsByTag,
);

// rootSaga
export function* postsSaga() {
  yield takeLatest(SET_POSTS, setPostsSaga);
  yield takeLatest(SET_POSTSBYTAG, setPostsByTagSaga);
  yield takeLatest(SET_MOREPOSTS, setMorePostsSaga);
  yield takeLatest(SET_MOREPOSTSBYTAG, setMorePostsByTagSaga);
}

const initialState = {
  posts: null,
  selectedTag: {
    nameKor: '모두보기',
    nameEng: 'all',
  },
  error: null,
  errorMsg: null,
};
// reducer
export default function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS_SUCCESS:
    case SET_POSTSBYTAG_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        error: null,
        errorMsg: null,
      };
    // 포스트가 없을 때는 posts를 비워줘야 함
    case SET_POSTS_FAILURE:
    case SET_POSTSBYTAG_FAILURE:
      return {
        ...state,
        posts: null,
        error: action.error,
        errorMsg: action.payload,
      };
    case SET_MOREPOSTS_SUCCESS:
    case SET_MOREPOSTSBYTAG_SUCCESS:
      return {
        ...state,
        posts: state.posts.concat(action.payload.posts),
        error: null,
        errorMsg: null,
      };
    // 더보기할 데이터가 없을 때는 posts는 남겨줘야 함
    case SET_MOREPOSTS_FAILURE:
    case SET_MOREPOSTSBYTAG_FAILURE:
      return {
        ...state,
        error: action.error,
        errorMsg: action.payload,
      };

    case SET_TAG:
      return {
        ...state,
        selectedTag: action.tag,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.postId),
        error: null,
        errorMsg: null,
      };
    default:
      return state;
  }
}

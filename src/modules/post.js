const SET_MOREPOST = 'post/SET_MOREPOST';
const SET_POSTBYTAG = 'post/SET_POSTBYTAG';
const SET_TAG = 'post/SET_TAG'

export const setMorePost = posts => ({ type: SET_MOREPOST, posts });
export const setPostByTag = posts => ({ type: SET_POSTBYTAG, posts });
export const setTag = tag => ({ type: SET_TAG, tag });

const initialState = {
  posts: [],
  selectedTag: {
    nameKor: '전체보기',
    nameEng: 'all'
  }
};

export default function post(state = initialState, action) {
  switch (action.type) {
    case SET_MOREPOST:
      return {
        ...state,
        posts: state.posts.concat(action.posts)
      };
    case  SET_POSTBYTAG:
      return {
        ...state,
        posts: action.posts
      };
    case SET_TAG:
      return {
        ...state,
        selectedTag: action.tag
      };
    default:
      return state;
  }
}
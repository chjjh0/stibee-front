const SET_POST = 'post/SET_POST';

export const setPost = posts => ({ type: SET_POST, posts });

const initialState = [];

export default function post(state = initialState, action) {
  switch (action.type) {
    case SET_POST:
      return state.concat(action.posts);
    default:
      return state;
  }
}
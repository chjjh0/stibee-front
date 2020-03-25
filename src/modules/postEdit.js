const INIT_POSTEDIT = 'postEdit/INIT_POSTEDIT';
const CHANGE_VALUE = 'postEdit/CHANGE_VALUE';
const CHANGE_ALL = 'postEdit/CHANGE_ALL';
const ADD_OPTION = 'postEdit/ADD_OPTION';
const REMOVE_OPTION = 'postEdit/REMOVE_OPTION';

export const initPostEdit = () => ({ type: INIT_POSTEDIT });
export const changeVal = (key, payload) => ({
  type: CHANGE_VALUE,
  key,
  payload,
});
export const addOption = (key, payload) => ({
  type: ADD_OPTION,
  key,
  payload,
});
export const removeOption = (key, payload) => ({
  type: REMOVE_OPTION,
  key,
  payload,
});
export const changeAll = payload => ({
  type: CHANGE_ALL,
  payload,
});

const initialState = {
  title: '',
  cont: {
    mdCont: '',
    htmlCont: '',
  },
  screenshot: '',
  colors: [],
  tags: [],
};

export default function postEdit(state = initialState, action) {
  switch (action.type) {
    case INIT_POSTEDIT:
      return initialState;
    case CHANGE_VALUE:
      return {
        ...state,
        [action.key]: action.payload,
      };
    case CHANGE_ALL:
      return {
        ...action.payload,
      };
    case ADD_OPTION:
      return {
        ...state,
        [action.key]: state[action.key].concat(action.payload),
      };
    case REMOVE_OPTION:
      return {
        ...state,
        [action.key]: state[action.key].filter(
          payload => payload !== action.payload,
        ),
      };
    default:
      return state;
  }
}

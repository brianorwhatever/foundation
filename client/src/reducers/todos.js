import { combineReducers } from 'redux';
import * as actions from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

const todos = (state = initialState, action) => {
  switch (action.type) {
    case actions.INVALIDATE_TODOS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case actions.REQUEST_TODOS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: true
      });
    case actions.RECEIVE_TODOS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.todos,
        lastUpdated: action.receivedAt
      })
    // case types.ADD_TODO:
    //   return [
    //     ...state,
    //     {
    //       id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
    //       done: false,
    //       task: action.text
    //     }];
    // case types.COMPLETE_TODO:
    //   return state.map(todo =>
    //     todo.id === action.id ?
    //       Object.assign({}, todo, { done: !todo.done }) :
    //       todo
    //   )
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos
});

export default rootReducer;

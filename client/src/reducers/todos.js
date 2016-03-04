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
      });
    case actions.ADD_TODO:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, action.json],
        lastUpdated: action.receivedAt
      });
    case actions.COMPLETE_TODO:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: state.items.map(todo =>
          todo.id === action.todo.id ?
          action.todo : todo
        )
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  todos
});

export default rootReducer;

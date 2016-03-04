import fetch from 'isomorphic-fetch';

import * as actions from '../constants/ActionTypes';
import * as api from '../constants/Api';

function requestTodos() {
  return { type: actions.REQUEST_TODOS }
}

function receiveTodos(json) {
  console.log('received todos:');
  console.log(json);
  return {
    type: actions.RECEIVE_TODOS,
    todos: json
  }
}

function fetchTodos() {
  return dispatch => {
    dispatch(requestTodos());
    return fetch(api.GET_TODOS)
      .then(req => req.json())
      .then(json => dispatch(receiveTodos(json)))
  }
}

function shouldFetchTodos(state) {
  return true;
}


export function fetchTodosIfNeeded() {
  return (dispatch, getState) => {
    if(shouldFetchTodos(getState())) {
      return dispatch(fetchTodos());
    }
  }
}

export function addTodo(text) {
  return { type: actions.ADD_TODO, text }
}

export function removeTodo(id) {
    return { type: actions.REMOVE_TODO, id }
}

export function completeTodo(id) {
    return { type: actions.COMPLETE_TODO, id }
}

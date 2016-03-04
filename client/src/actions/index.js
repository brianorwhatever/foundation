import fetch from 'isomorphic-fetch';

import * as actions from '../constants/ActionTypes';
import * as api from '../constants/Api';

const fetchHeaders = { headers: { 'Content-Type' : 'application/json' } };

function requestTodos() {
  return { type: actions.REQUEST_TODOS }
}

function addTodo(json) {
  console.log('adding: ');
  console.log(json);
  return { type: actions.ADD_TODO, json }
}

function receiveTodos(json) {
  console.log('received todos:');
  console.log(json);
  return {
    type: actions.RECEIVE_TODOS,
    todos: json
  }
}

function sendFetchTodos() {
  return dispatch => {
    dispatch(requestTodos());
    return fetch(api.GET_TODOS.url, { method: api.GET_TODOS.method })
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
      return dispatch(sendFetchTodos());
    }
  }
}

export function sendAddTodo(text) {
  return dispatch => {
    fetch(api.CREATE_TODO.url, Object.assign({}, { method: api.CREATE_TODO.method, body: JSON.stringify({ todo: text }) }, fetchHeaders))
      .then(req => req.json())
      .then(json => dispatch(addTodo(json)))
  }
}

export function removeTodo(id) {
    return { type: actions.REMOVE_TODO, id }
}

export function completeTodo(id) {
    return { type: actions.COMPLETE_TODO, id }
}

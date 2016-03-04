import fetch from 'isomorphic-fetch';

import * as actions from '../constants/ActionTypes';
import * as api from '../constants/Api';

const fetchHeaders = { headers: { 'Content-Type' : 'application/json' } };

/* Get */
export function sendFetchTodos() {
  return dispatch => {
    dispatch(requestTodosAction());
    return fetch(api.GET_TODOS.url, { method: api.GET_TODOS.method })
      .then(req => req.json())
      .then(json => dispatch(receiveTodosAction(json)))
  }
}
function requestTodosAction() {
  return { type: actions.REQUEST_TODOS }
}
function receiveTodosAction(json) {
  return {
    type: actions.RECEIVE_TODOS,
    todos: json
  }
}

/* Add */
export function sendAddTodo(text) {
  return dispatch => {
    fetch(api.CREATE_TODO.url, Object.assign({}, { method: api.CREATE_TODO.method, body: JSON.stringify({ todo: text }) }, fetchHeaders))
      .then(req => req.json())
      .then(json => dispatch(addTodo(json)))
  }
}
function addTodo(json) {
  return { type: actions.ADD_TODO, json }
}

/* Remove */
export function removeTodo(id) {
  return dispatch => {
    fetch(api.REMOVE_TODO.url, Object.assign({}, { method: api.REMOVE_TODO.method, body: JSON.stringify({ id: id }) }, fetchHeaders))
      .then(req => req.json())
      .then(json => dispatch(removeTodoAction(id)))
  }
}
function removeTodoAction(id) {
  return { type: actions.REMOVE_TODO, id }
};

/* Update */
export function toggleTodoComplete(todo) {
  return dispatch => {
    fetch(api.UPDATE_TODO.url, Object.assign({}, { method: api.UPDATE_TODO.method, body: JSON.stringify({ id: todo.id, done: !todo.done }) }, fetchHeaders))
      .then(req => req.json())
      .then(json => dispatch(completeTodoAction(json)))
  }
}
function completeTodoAction(todo) {
  return { type: actions.COMPLETE_TODO, todo }
}

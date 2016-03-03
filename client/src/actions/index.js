import * as types from '../constants/ActionTypes';

export function addTodo(text) {
  return { type: types.ADD_TODO, text }
}

export function removeTodo(id) {
    return { type: types.REMOVE_TODO, id }
}

export function completeTodo(id) {
    return { type: types.COMPLETE_TODO, id }
}

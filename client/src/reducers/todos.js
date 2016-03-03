import * as types from '../constants/ActionTypes';

const initialState = [
    {
      id: 0,
      task: "type some todossss",
      done: false
    },
    {
      id: 1,
      task: "type some more todos",
      done: false
    }
]

const todos = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          done: false,
          task: action.text
        }];
    case types.COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { done: !todo.done }) :
          todo
      )
    default:
      return state;
  }
};

export default todos;

import { createStore, combineReducers } from 'redux';
import todos from '../reducers/todos';

const store = combineReducers({
  todos
});

export default createStore(store);

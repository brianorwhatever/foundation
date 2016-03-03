import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from '../actions';

import TodoInput from './todo-input';
import TodoItem from './todo-item';

class Todos extends Component {
  render() {
    const { actions, todos } = this.props;
    return (
      <div>
        <ul>
          {todos.map((todo, index) => {
            return <TodoItem key={index} todo={todo} onClick={actions.completeTodo}/>;
          })}
        </ul>
        <TodoInput onSubmit={actions.addTodo}/>
      </div>
    );
  }
}

const mapStateToProps = (
  state
) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (
  dispatch
) => {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);

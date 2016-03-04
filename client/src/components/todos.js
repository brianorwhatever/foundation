import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from '../actions';

import TodoInput from './todo-input';
import TodoItem from './todo-item';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompleteTodo = this.handleCompleteTodo.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(TodoActions.fetchTodosIfNeeded());
  }

  handleCompleteTodo(id) {
    const { dispatch } = this.props;
    dispatch(TodoActions.completeTodo(id));
  }

  handleSubmit(text) {
    const { dispatch } = this.props;
    dispatch(TodoActions.sendAddTodo(text));
  }

  render() {
    const { todos } = this.props;
    console.log(todos);
    return (
      <div>
        <ul>
          {todos.map((todo, index) => {
            return <TodoItem key={index} todo={todo} onClick={this.handleCompleteTodo}/>;
          })}
        </ul>
        <TodoInput onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (
  state
) => {
  const { todos } = state;
  const {
    isFetching,
    lastUpdated,
    items
  } = todos || {
    isFetching: true,
    items: []
  }

  return {
    todos: items,
    isFetching,
    lastUpdated
  }
};

export default connect(mapStateToProps)(Todos);

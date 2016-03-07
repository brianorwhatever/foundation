import React from 'react';
import classNames from 'classnames';

class TodoItem extends React.Component {
    handleClick(e) {
        this.props.onClick(this.props.todo);
    }

    handleDelete() {
      this.props.onDelete(this.props.todo.id);
    }

    render() {
        const { todo } = this.props;
        const classes = classNames('todo-item', {
            'done' : todo.done
        });
        return (
            <div className="todoitem wood">
              <div className="delete">x</div>
              <div className="item" onClick={this.handleClick.bind(this)}>{todo.todo}</div>
              <div className="complete" onClick={this.handleDelete.bind(this)}>✓</div>
            </div>
        );
    }
}

export default TodoItem;

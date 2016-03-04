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
            <li><span className={classes} onClick={this.handleClick.bind(this)}>{todo.todo}</span><span onClick={this.handleDelete.bind(this)}>X</span></li>
        );
    }
}

export default TodoItem;

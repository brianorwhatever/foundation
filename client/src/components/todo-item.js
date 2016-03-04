import React from 'react';
import classNames from 'classnames';

class TodoItem extends React.Component {
    handleClick(e) {
        this.props.onClick(this.props.todo);
    }

    render() {
        const { todo } = this.props;
        const classes = classNames('todo-item', {
            'done' : todo.done
        });
        return (
            <li className={classes} onClick={this.handleClick.bind(this)}>{todo.todo}</li>
        );
    }
}

export default TodoItem;

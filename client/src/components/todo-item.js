import React from 'react';
import classNames from 'classnames';

class TodoItem extends React.Component {
    handleClick(e) {
        this.props.onClick(this.props.todo.id);
    }
    
    render() {
        const { todo } = this.props;
        const classes = classNames('todo-item', {
            'done' : todo.done
        });
        return (
            <li className={classes} onClick={this.handleClick.bind(this)}>{todo.task}</li>
        );
    }
}

export default TodoItem;
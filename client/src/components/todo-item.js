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
        const todoClasses = classNames('item', {
            'done' : todo.done
        });
        const checkmarkClasses = classNames('checkmark', {
            'done' : todo.done
        });

        return (
            <div className="todoitem wood">
              <div className={todoClasses}><span className="todo-text">{todo.todo}</span></div>
              <div className={checkmarkClasses} onClick={this.handleClick.bind(this)}/>
              <div className="delete" onClick={this.handleDelete.bind(this)}/>
            </div>
        );
    }
}

export default TodoItem;

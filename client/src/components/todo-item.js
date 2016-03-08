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
        const classes = classNames('item', {
            'done' : todo.done
        });
        return (
            <div className="todoitem wood">
              <div className="delete" onClick={this.handleDelete.bind(this)}></div>
              <div className={classes}>{todo.todo}</div>
              <div className="complete" onClick={this.handleClick.bind(this)}></div>
            </div>
        );
    }
}

export default TodoItem;

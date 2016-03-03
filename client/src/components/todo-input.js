import React, { Component, PropTypes } from 'react';

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
    
    onChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    
    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSubmit(text);
            this.setState({ value: '' })
        }
    }
    
    render() {
        return (
            <input
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                onKeyDown={this.handleSubmit.bind(this)}
            />
        );
    }
}

TodoInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default TodoInput;
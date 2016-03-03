import React from 'react';

export default React.createClass({
    render: function() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.tagline}</h2>
            </div>
        );
    }
})

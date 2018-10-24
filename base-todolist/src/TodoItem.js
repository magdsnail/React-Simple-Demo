import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { deleteItem, index } = this.props; 
        deleteItem(index);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.content !== this.props.content) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { content, test } = this.props;
        return (
            <div onClick={this.handleClick}>
                {test} - {content}
            </div>
        );
    }
}

TodoItem.propTypes = {
    test: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

TodoItem.defaultProps = {
    test: 'hello world'
}

export default TodoItem;
import React from 'react';

const TTextfield = props => {

    return (
        <textarea
            className="text"
            rows={props.rows || 1}
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            autoFocus={props.autoFocus}
        >
            {props.children}
        </textarea>
    )
}

export default TTextfield;
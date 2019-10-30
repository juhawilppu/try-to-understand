import React from 'react';

const TTextfield = props => {

    return (
        <textarea
            className="text"
            value={props.value || ''}
            rows={props.rows || 1}
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            onChange={props.onChange}
            autoFocus={props.autoFocus}
            maxLength={props.maxLength}
        />
    )
}

export default TTextfield;
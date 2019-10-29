import React from 'react';

const TButton = props => {

    let type = 'primary';
    if (props.flat) {
        type = 'flat';
    }
    if (props.secondary) {
        type = 'secondary';
    }

    return (
        <button className={type} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default TButton;
import React from 'react';

const TButton = props => {

    let type = 'primary';
    if (props.flat) {
        type = 'flat';
    }
    if (props.secondary) {
        type = 'secondary';
    }

    const click = () => {
        if (props.onClick) {
            props.onClick();
        } else if (props.href) {
            window.location = props.href;
        }
    }

    return (
        <button className={type} onClick={click} >
            {props.children}
        </button>
    )
}

export default TButton;
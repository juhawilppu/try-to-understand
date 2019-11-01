import React from 'react';

const TButton = props => {

    let type = 'primary';
    if (props.flat) {
        type = 'flat';
    }
    if (props.secondary) {
        type = 'secondary';
    }

    const classes = [type, props.color]

    const click = () => {
        if (props.onClick) {
            props.onClick();
        } else if (props.href) {
            window.location = props.href;
        }
    }

    return (
        <button className={classes.join(' ')} onClick={click} >
            {props.children}
        </button>
    )
}

export default TButton;
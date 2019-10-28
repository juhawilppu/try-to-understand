import * as React from 'react';

function Logo(props) {

    const text = <React.Fragment>
        <span style={{color: '#FF6F00'}}>Try</span>
        <span style={{color: '#03A9F4'}}>To</span>
        <span style={{color: '#4CAF50'}}>Understand</span>
    </React.Fragment>

    if (props.wrap) {
        return (
            <span style={{background: 'white', borderRadius: 20, padding: 7, paddingLeft: 20, paddingRight: 20, fontWeight: 'bold'}}>
                {text}
            </span>
        )
    } else {
        return (
            <span style={{fontWeight: 'bold'}}>
                {text}
            </span>
        )
    }

}

export default Logo;
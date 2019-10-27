import * as React from 'react';

function Logo(props) {
    return (
        <React.Fragment>
            <span style={{background: 'white', borderRadius: 20, padding: 7, paddingLeft: 20, paddingRight: 20, fontWeight: 'bold'}}>
                <span style={{color: '#FF6F00'}}>Try</span>
                <span style={{color: '#03A9F4'}}>To</span>
                <span style={{color: '#4CAF50'}}>Understand</span>
            </span>
        </React.Fragment>
    )
}

export default Logo;
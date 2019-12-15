import React from 'react';

interface TTextfieldProps {
    value: any;
    rows: number;
    onClick?: any;
    onKeyDown?: any;
    onChange: any;
    autoFocus: boolean;
    maxLength: number;
}
const TTextfield = (props : TTextfieldProps) => {

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
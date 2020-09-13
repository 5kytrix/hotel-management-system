import React from 'react';

import { FormGroup, FormFeedback, Label } from 'reactstrap';

const select = (props) => {
    const classes = ['form-control'];
    if (props.valid !== undefined && !props.valid) {
        classes.push('is-invalid');
    }

    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <select className={classes.join(' ')} value={props.current} disabled={props.disabled}
              onChange={event => props.change(event.target.value)}>

                <option value="">--------</option>

                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            <FormFeedback>{props.error}</FormFeedback>
        </FormGroup>
    );
};

export default select;

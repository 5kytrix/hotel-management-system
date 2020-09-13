import React from 'react';

import {
    Label,
    Input,
    FormGroup,
    FormFeedback,
} from 'reactstrap';

const input = (props) => {
    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <Input type={props.type} onChange={event => props.onChange(event.target.value)} disabled={props.disabled}
              value={props.value} placeholder={props.placeholder} invalid={!props.valid} className={props.className}
              min={props.min} max={props.max} onBlur={props.onBlur} />
            {!props.valid ? <FormFeedback invalid="true">{props.error}</FormFeedback> : null}
        </FormGroup>
    );
};

export default input;

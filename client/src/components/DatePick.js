import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FormGroup, FormFeedback, Label } from 'reactstrap';

const DatePick = (props) => {
    const classes = ['form-control'];
    if (props.valid !== undefined && !props.valid) {
        classes.push('is-invalid');
    }

    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    };

    return (
        <FormGroup>
            <Label>{props.label}</Label>
            <br></br>
            <DatePicker className={classes.join(' ')} onChangeRaw={handleDateChangeRaw} dateFormat={props.dateFormat || 'dd/MM/yyyy'} selected={props.current} onChange={props.change} showMonthDropdown
              showYearDropdown />

            <FormFeedback>{props.error}</FormFeedback>
        </FormGroup>
    );
};

export default DatePick;

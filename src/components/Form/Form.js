import React, { useState, useEffect } from 'react';

import './Form.scss';

const Form = ({ data: {controls}, onSubmition, succeded, error, defaultValues }) => {
    let initialState = {};
    if (controls && controls.length) {
        controls.forEach(control => {
            if(control) initialState[control.id] = defaultValues ? defaultValues[control.id] : '';
        });
    }
    const [formValues, setFormValues] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (ev, control) => {
        setFormValues({...formValues, [control.id]: ev.target.value});
    }

    useEffect(() => {
        if (defaultValues) {
            if (defaultValues.birthDate) {
                const propDate = new Date(defaultValues.birthDate);
                var day = ("0" + propDate.getDate()).slice(-2);
                var month = ("0" + (propDate.getMonth() + 1)).slice(-2);
                var theDate = propDate.getFullYear()+"-"+(month)+"-"+(day);
                defaultValues.birthDate = theDate;
            }
            setFormValues(defaultValues);
        }
    }, [defaultValues])

    const handleSubmition = (ev) => {
        console.log('handleSubmition', ev, formValues, controls);
        ev.preventDefault();
        setSubmitted(true);
        let formValid = true;
        for (const key in formValues) {
            if (Object.hasOwnProperty.call(formValues, key) && key !== 'id') {
                const value = formValues[key].trim(),
                        theControl = controls.find(ctrl => ctrl.id == key);

                if (!value.length  || (theControl  && theControl.regex && !theControl.regex.test(value))) {
                    formValid = false;
                    console.log(theControl, value, theControl.regex);
                    break;
                }
            }
        }
        console.log('handleSubmition', formValid);
        if (formValid) {
            const theValues = JSON.parse(JSON.stringify(formValues));
            theValues.birthDate = new Date(theValues.birthDate).toISOString();
            onSubmition(theValues);
        }
    }

    return (
        <form className="form" noValidate={true}  onSubmit={e => (e.persist(), handleSubmition(e))}>
            {((succeded || error)) && <div className={["sent-message", succeded ? "success" : '', error ? "error" : ''].join(' ')}>
                <span className="arrow"></span> {succeded ? 'Success!!!' : 'There was an error... try later!'}
            </div>}
            <p className="form-required-message">*Required Data</p>
            {controls && controls.map(control => control ? (
                <div key={control.id} className="control-wrapper">
                    <label htmlFor={control.id}>
                        {control.label}
                    </label>
                    <input 
                        id={control.id} 
                        type={control.type}
                        required={control.required} 
                        title={control.title}
                        className={[
                            "input", 
                            control.regex && formValues ? 
                                // this works to have an inmediate validation as control input changes
                                // ( (!control.regex.test(formValues[control.id]) && ((formValues[control.id].length && !submitted) || (!formValues[control.id].length && submitted)) ) ? styles.invalid : '')
                                ( (!control.regex.test(formValues[control.id].trim()) && submitted) ? "invalid" : '') 
                                : '',
                            submitted && control.required && !formValues[control.id].trim().length ? "invalid" : ''].join(' ')} 
                        pattern={control.regex} 
                        value={formValues ? formValues[control.id] : ''} 
                        onChange={ev => {
                            ev.persist(); handleChange(ev, control);
                        }} />
                    <span className="input-error-message">{control.errMessage}</span>
                </div>
            ) : null)}
            <div className="submit-button-wrapper">
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Form;

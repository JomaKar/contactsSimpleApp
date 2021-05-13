import React, { useEffect, useState } from 'react';

import './Form.scss';

const Form = ({ data: {controls}, onSubmition, succeded, error }) => {
    let initialState = {};
    if (controls && controls.length) {
        controls.forEach(control => {
            if(control) initialState[control.id] = control.defaultValue ? control.defaultValue : '';
        });
    }
    const [formValues, setFormValues] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (ev, control) => {
        setFormValues({...formValues, [control.id]: ev.target.value});
    }

    const handleSubmition = (ev) => {
        ev.preventDefault();
        setSubmitted(true);
        let formValid = true;
        for (const key in formValues) {
            if (Object.hasOwnProperty.call(formValues, key)) {
                const value = formValues[key].trim(),
                        theControl = controls.find(ctrl => ctrl.id == key);

                if (!value.length  || (theControl  && theControl.regex && !theControl.regex.test(value))) {
                    formValid = false;
                    break;
                }
            }
        }
        if (formValid) {
            onSubmition(formValues);
        }
    }

    return (
        <form className="form" noValidate={true}  onSubmit={e => (e.persist(), handleSubmition(e))}>
            {((succeded || error)) && <div className={["sent-message", succeded ? "success" : '', error ? "error" : ''].join(' ')}>
                <span className={styles.arrow}></span> {succeded ? 'Success!!!' : 'There was an error... try later!'}
            </div>}
            <p className="form-required-message">*Required Data</p>
            {controls && controls.map(control => control ? (
                <div key={control.id} className={styles.controlWrapper}>
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
                            control.regex ? 
                                // this works to have an inmediate validation as control input changes
                                // ( (!control.regex.test(formValues[control.id]) && ((formValues[control.id].length && !submitted) || (!formValues[control.id].length && submitted)) ) ? styles.invalid : '')
                                ( (!control.regex.test(formValues[control.id].trim()) && submitted) ? "invalid" : '') 
                                : '',
                            submitted && control.required && !formValues[control.id].trim().length ? "invalid" : ''].join(' ')} 
                        pattern={control.regex} 
                        value={formValues[control.id]} 
                        onChange={ev => {ev.persist(), handleChange(ev, control)}} />
                    <span className="input-error-message">{control.errMessage}</span>
                </div>
            ) : null)}
            <div className="submit-button-wrapper">
                <button onClick={ev => ev.preventDefault()} type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default Form;

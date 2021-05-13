import React, {useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom";

import { edit, add, getOne, deleteOne } from '../../api/contacts';

import Form from '../Form/Form';

import './Modal.scss';

const ModalContainer = ({outputEmit, isDeletion}) => {
    let { contactId } = useParams();
    const history = useHistory();
    const ref = useRef(null);
    const [isEdit, setFormType] = useState(contactId);
    const [edittedContact, setContact] = useState(null);
    const [submitOk, isSubmitOk] = useState(false);
    const [submitErr, isSubmitError] = useState(false);
    const formData = {
        controls: [
            {
                id: 'name',
                label: <p style={{margin: 0}}>Full Name <span style={{color: '#9f0071'}}>*</span></p>,
                title: 'Full Name',
                type: 'text',
                required: true,
                errMessage: 'Name is required'
            },
            {
                id: 'email',
                label: <p style={{margin: 0}}>Email <span style={{color: '#9f0071'}}>*</span></p>,
                title: 'Email',
                type: 'email',
                required: true,
                regex: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                errMessage: "Theres an error with the mail"
            },
            {
                id: 'phone',
                label: <p style={{margin: 0}}>Phone <span style={{color: '#9f0071'}}>*</span></p>,
                title: 'Phone',
                type: 'text',
                required: true,
                regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                errMessage: "Theres an error with the phone number"
            },
            {
                id: 'birthDate',
                label: <p style={{margin: 0}}>Birth Date (format as dd/mm/yyyy)</p>,
                title: 'Birth Date',
                type: 'date',
                required: false,
                regex: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
                errMessage: "Theres an error with the date"
            }
        ]
    };

    const closeFromInside = () => {
        history.push('/');
    }

    const handleUserKeyPress = useCallback(event => {
        const { key } = event;
        if (key === "Escape") closeFromInside();
    }, []);

    const handleClickOutside = (event) => {
        if(ref.current && !ref.current.contains(event.target)) closeFromInside();
    }
        
    useEffect(() => {
        if (contactId) {
            getOne(contactId).then(data => {
                if(data) {
                    setContact(data);
                }
            });
        }

        document.addEventListener('keydown', handleUserKeyPress);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleUserKeyPress);
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        if (submitOk) {
            outputEmit();
        }

        if (submitOk || submitErr) {
            setTimeout(() => {
                closeFromInside();
            }, 1200);
        }

    }, [submitOk, submitErr]);


    const handleSubmition = (formValues) => {
        console.log('formValues', formValues);
        if (contactId) {
            console.log('is Edit');
            edit(contactId, formValues)
                .then(rs => {
                    console.log('rs', rs);
                    isSubmitOk(true);
                })
                .catch(err => {
                    console.error(err);
                    isSubmitError(true);
                })
        } else {
            console.log('is Addition');
            add(formValues)
                .then(rs => {
                    console.log('rs', rs);
                    isSubmitOk(true);
                })
                .catch(err => {
                    console.error(err);
                    isSubmitError(true);
                })

        }
    }

    const deleteContact = () => {
        if (contactId) {
            console.log('is delete');
            deleteOne(contactId)
                .then(rs => {
                    console.log('rs', rs);
                    isSubmitOk(true);
                })
                .catch(err => {
                    console.error(err);
                    isSubmitError(true);
                })
        }
    }

    return <div className="modal-container">
            <div className="modal-wrapper">
                <div ref={ref} className="modal">
                    <div className="modal-header">
                        <h3 className="header-text"> {isEdit ? (isDeletion ? 'Delete Contact' : 'Edit Contact') : 'Add new Contact'} </h3>
                        <div className="close-modal-control-wrapper" onClick={() => closeFromInside() }>
                            X
                        </div>
                    </div>
                    <div className="modal-body">
                        {isDeletion && edittedContact ? <div className="deletion-confirmation">
                            <p>
                                Are you sure you want to delete {edittedContact.name}???
                            </p>
                            <button onClick={() => deleteContact()}>Yes!</button>
                        </div> : <Form onSubmition={handleSubmition} data={formData} succeded={submitOk} error={submitErr} defaultValues={edittedContact} />}
                    </div>
                </div>
            </div>
        </div>;
};

export default ModalContainer;

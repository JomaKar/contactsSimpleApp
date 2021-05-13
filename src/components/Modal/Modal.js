import React, {useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from "react-router-dom";

import { edit, add } from '../../api/contacts';


import './Modal.scss';

const ModalContainer = ({closeFromInside}) => {
    let { contactId } = useParams();
    const ref = useRef(null);
    const [isEdit, setFormType] = useState(contactId);
    const [isVisible, setVisibility] = useState(false);
    console.log('contactId from MODAL', contactId);

    const handleUserKeyPress = useCallback(event => {
        const { key } = event;
        if (key === "Escape") closeFromInside();
    }, []);

    const handleClickOutside = (event) => {
        if(ref.current && !ref.current.contains(event.target)) closeFromInside();
    }
        
    useEffect(() => {
        document.addEventListener('keydown', handleUserKeyPress);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleUserKeyPress);
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return <div className="modal-container">
            <div className="modal-wrapper">
                <div ref={ref} className="modal">
                    <div className="modal-header">
                        <h3 className="header-text"> {isEdit ? 'Edit Contact' : 'Add new Contact'} </h3>
                        <div className="close-modal-control-wrapper" onClick={() => closeFromInside('Click Close') }>
                            X
                        </div>
                    </div>
                    <div className="modal-body">
                        modal
                    </div>
                </div>
            </div>
        </div>;
};

export default ModalContainer;

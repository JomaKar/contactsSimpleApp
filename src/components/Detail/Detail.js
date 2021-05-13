// @packages
import React, {useState, useEffect} from 'react';

import { getOne } from '../../api/contacts';

import { useParams, Link, useHistory } from "react-router-dom";

import './Detail.scss';

const Detail = (props) => {
    const [contact, setContact] = useState(null);
    let { contactId } = useParams();
    const history = useHistory();
    console.log('here!!!!', contactId);
       
    useEffect(() => {
        if (contactId) {
            getOne(contactId).then(data => {
                if(data) {
                    if (data.birthDate) {
                        const propDate = new Date(data.birthDate);
                        var day = ("0" + propDate.getDate()).slice(-2);
                        var month = ("0" + (propDate.getMonth() + 1)).slice(-2);
                        var theDate = propDate.getFullYear()+"-"+(month)+"-"+(day);
                        data.birthDate = theDate;
                    }
                    setContact(data);
                }
            });
        }
    }, [contactId]);

    return (
        <div className="detail-wrapper">
            Details:
            <span onClick={() => history.push('/')} className="closeX">+</span>
            {contact && <div className="data-body">
                <p>Name: <span className="detail-value">{contact.name}</span></p>
                <p>Phone: <span className="detail-value">{contact.phone}</span></p>
                <p>Email: <span className="detail-value">{contact.email}</span></p>
                <p>Birth date: <span className="detail-value">{contact.birthDate}</span></p>
                <div className="options-container">
                    <Link className="contact-option" to={`/edit/${contact.id}`}>Edit</Link>
                    <Link className="contact-option red" to={`/delete/${contact.id}`}>Delete</Link>
                </div>
            </div>
            }
        </div>
  );
}

export default Detail;

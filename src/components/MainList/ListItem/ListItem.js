// @packages
import React, { useState, useEffect } from 'react';
import {
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import './ListItem.scss';

function ListItem({data}) {
    let { path, url } = useRouteMatch();
    let { contactId } = useParams();
    const [isTooltip, toggleTooltip] = useState(false);
    console.log('url', url);

    useEffect(() => {
        console.log('url', url);
    }, [contactId])

    return (
        <li className="contact-li-wrapper">
            <div className="contact-info-container"> 
                <div className="contact-info">
                    {data.name} : {data.phone} 
                </div>
                <button onClick={() => toggleTooltip(!isTooltip)} className="icon-container">+</button> 
            </div> 
            {isTooltip && <div className="contact-options-tooltip">    
                <Link to={`${url}detail/${data.id}`} className="icon-container">
                    Detail
                </Link> 
                <Link to={`${url}edit/${data.id}`} className="icon-container">
                    Edit
                </Link> 
            </div>}
        </li>
  );
}

export default ListItem;

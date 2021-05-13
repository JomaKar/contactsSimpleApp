// @packages
import React, { useState, useEffect, useRef } from 'react';
import {
    Link
  } from "react-router-dom";

import './ListItem.scss';

function ListItem({data}) {
    const [isTooltip, toggleTooltip] = useState(false);
    const ref = useRef(null);

    useEffect(() => {  
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [])
    
    const handleClickOutside = (event) => {
        if(ref.current && !ref.current.contains(event.target)) {
            toggleTooltip(false);
        }
    }

    return (
        <li className="contact-li-wrapper">
            <div className="contact-container"> 
                <div className="contact-info">
                    {data.name} : {data.phone} 
                </div>
                <div className="icon-container">
                    <button onClick={() => toggleTooltip(!isTooltip)} className="icon-button">
                        +
                    </button> 
                    {isTooltip && <div ref={ref} className="contact-options-tooltip">    
                        <Link onClick={() => toggleTooltip(false)}  to={`/detail/${data.id}`} className="link-option">
                            Detail
                        </Link> 
                        <Link onClick={() => toggleTooltip(false)} to={`/edit/${data.id}`} className="link-option">
                            Edit
                        </Link> 
                    </div>}
                </div>
            </div> 
        </li>
  );
}

export default ListItem;

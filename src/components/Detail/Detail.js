// @packages
import React from 'react';
import { useParams } from "react-router-dom";

const Detail = (props) => {
    let { contactId } = useParams();
    console.log('here!!!!', contactId);

    return (
        <div className="detail-wrapper">
            detail {contactId}
        </div>
  );
}

export default Detail;

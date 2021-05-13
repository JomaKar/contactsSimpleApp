// @packages
import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

import { getAll } from '../../api/contacts';

import ListItem from './ListItem/ListItem';
import Detail from '../Detail/Detail';
import Modal from '../Modal/Modal';

import './MainList.scss';

function MainList() {
    let { path, url } = useRouteMatch();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAll().then(data => {
            if(data && data.length) setContacts(data);
        });
    }, []);

    return (
        <div className="container">
            <div className="main-list">
                <ul>
                    {contacts.map(contact => <ListItem data={contact} key={contact.id} />)}
                </ul>
            </div>
            <div className="detail-view">
                <Switch>
                    <Route exact path={`${path}detail/:contactId`}>
                        <Detail />
                    </Route>
                    <Route path={`${path}add`}>
                        <Modal />
                    </Route>
                    <Route path={`${path}edit/:contactId`}>
                        <Modal />
                    </Route>
                </Switch>
            </div>
        </div>
  );
}

export default MainList;

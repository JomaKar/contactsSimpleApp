// @packages
import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    Link,
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
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        console.log('FETCHING CONTACTS');
        getAll().then(data => {
            if(data && data.length) {
                console.log('FETCHED CONTACTS', data);
                setContacts(data);
            }
        });
    }

    return (
        <div className="container">
            <div className="header-app">
                <h1>
                    Welcome to your contacts List App
                </h1>
            </div>
            <div className="content-app">
                <div className="list-wrapper">
                    <ul className="contacts-list">
                        {contacts.map(contact => <ListItem data={contact} key={contact.id} />)}
                    </ul>
                </div>
                <div className="detail-view">
                    <Switch>
                        <Route exact path={`${path}detail/:contactId`}>
                            <Detail />
                        </Route>
                        <Route path={`${path}add`}>
                            <Modal outputEmit={() => fetchContacts() } />
                        </Route>
                        <Route path={`${path}edit/:contactId`}>
                            <Modal outputEmit={() => fetchContacts() } />
                        </Route>
                        <Route path={`${path}delete/:contactId`}>
                            <Modal isDeletion={true} outputEmit={() => fetchContacts() } />
                        </Route>
                    </Switch>
                </div>

            </div>
            <div className="add-wrapper">
                <Link className="add-btn" to="/add">Add</Link>
            </div>
        </div>
  );
}

export default MainList;

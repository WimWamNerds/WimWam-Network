import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Chats from './Chats';
import Login from './Login';
import CreateAccount from './CreateAccount';

const Pages: React.FC = () => {
    return (
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/chats" component={Chats} />
            <Route path="/login" component={Login} />
            <Route path="/createaccount" component={CreateAccount} />
            <Redirect path="/" to="/home" />
        </Switch>
    );

};

export default Pages;
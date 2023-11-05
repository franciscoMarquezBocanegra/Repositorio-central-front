import React, { useContext } from 'react';
import LoginScreen from '../login/LoginScreen';
import HomeScreen from '../home/HomeScreen';
import SignUpScreen from '../signup/SignUpScreen';
import { UserContext } from '../../context/UserContext';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    /* Link, */
    Redirect
  } from "react-router-dom";


/* El switch es como el switch de java y js, dejar las rutas mas generales abajo */
const AppRouter = () => {
    const { user } = useContext( UserContext );
    const { logged } = user;

    return (
        <Router>
            <div>
                <Switch>
                    { logged && <Route exact path="/main" component={ HomeScreen }/>}

                    { !logged && <Route exact path="/login" component={ LoginScreen }/>}
                    { !logged && <Route exact path="/signup" component={ SignUpScreen }/>}
                    { logged && <Redirect to="/main" />}
                    { !logged && <Redirect to="/login" />}
                </Switch>

            </div>
        </Router>
    )
}

export default AppRouter;

import React, { useEffect, useReducer } from 'react';
import './css/App.css';
import AppRouter from './components/routers/AppRouter';
import { UserContext } from './context/UserContext';
import { authReducer } from './components/auth/authReducer';
import 'semantic-ui-css/semantic.min.css';

function App() {
    const init = () => {
        return (
            JSON.parse(localStorage.getItem('user')) || {
                logged: false,
            }
        );
    };
    /* const [state, dispatch] = useReducer(reducer, initialState, init) */
    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <div className="App">
            <UserContext.Provider value={{ user, dispatch }}>
                <AppRouter />
            </UserContext.Provider>
        </div>
    );
}

export default App;

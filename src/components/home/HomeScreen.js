import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { types } from '../types/types';
import Chat from './Chat';
import '../../css/Main.css';
import { ChatEngineWrapper } from 'react-chat-engine';
import { fb } from 'services';

const HomeScreen = () => {
    const { dispatch } = useContext(UserContext);

    const handleClick = () => {
        const action = {
            type: types.logout,
        };
        fb.auth.signOut().catch();
        dispatch(action);
    };

    return (
        <div className="main-container">
            <div className="flex-container">
                <h1> Bienvenido a U-cord</h1>
                <button
                    type="button"
                    className="glow-on-hover"
                    onClick={handleClick}
                >
                    Cerrar Sesión{' '}
                </button>
            </div>
            <div>
                <ChatEngineWrapper>
                    <Chat />
                </ChatEngineWrapper>
            </div>
        </div>
    );
};

export default HomeScreen;

import InfoUser from 'components/home/InfoUser';
import Avatar from 'components/ImageUpload/Avatar';
import { UserContext } from 'context/UserContext';
import React, { useContext, useState } from 'react';
import { PeopleSettings } from 'react-chat-engine';
import { ChatEngineContext } from 'react-chat-engine';
import { chatEngineApiClient } from 'services/chatEngineApiClient';

const ChatSettings = () => {
    const { user } = useContext(UserContext);
    const { activeChat } = useContext(ChatEngineContext);
    const [myProfile, setMyProfile] = useState(false);
    const message = '¿Estas seguro de querer abandonar esta sala de chat?';

    const salirChat = () => {
        if (window.confirm(message))
            chatEngineApiClient.darDeBaja(user, activeChat);
    };

    const handleClick = () => {
        setMyProfile(true);
    };

    const addUserToChat = () => {
        const siglas = prompt('Ingresa siglas de la materia.');
        if (siglas == null) {
            return;
        }
        !siglas && alert('Debe ingresar una sigla.');
        siglas && chatEngineApiClient.addUserToChat(user, siglas);
    };

    return (
        <div id="chat-setting-container" align="center">
            <br />
            <Avatar />
            <div id="buttons-container">
                <button
                    type="button"
                    className="glow-on-hover"
                    onClick={handleClick}
                >
                    Mi perfil.
                </button>
                {myProfile && <InfoUser setMyProfile={setMyProfile} />}
                <button
                    type="button"
                    className="glow-on-hover"
                    onClick={addUserToChat}
                >
                    Buscar sala de estudio.
                </button>
                <button
                    type="button"
                    className="glow-on-hover"
                    onClick={salirChat}
                >
                    Salir del chat.
                </button>
                <PeopleSettings />
            </div>
        </div>
    );
};

export default ChatSettings;

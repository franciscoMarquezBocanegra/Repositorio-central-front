import { ChatEngine } from 'react-chat-engine';
import { UserContext } from '../../context/UserContext';
import React, { useContext } from 'react';
import '../../css/Chat.css';
import ChatForm from '../ui/ChatForm';
import ChatSettings from 'components/ui/ChatSettings';

const Chat = () => {
    const { user } = useContext(UserContext);
    return (
        <ChatEngine
            //Chat functionality options
            projectID="51f9470a-b910-4f84-b3e6-52dfe6030f5f"
            userName={user.correo}
            userSecret={user.contraseña}
            offset={-5}
            //Chat custom UI options
            height="88vh"
            renderNewChatForm={creds => <ChatForm key={1}> </ChatForm>}
            renderChatSettings={chatAppState => (
                <ChatSettings key={2}></ChatSettings>
            )}
            onNewMessage={() =>
                new Audio(
                    'https://chat-engine-assets.s3.amazonaws.com/click.mp3',
                ).play()
            }
        />
    );
};

export default Chat;

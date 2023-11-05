import React from 'react';

const ChatForm = ({ title = 'Salas de Estudio' }) => {
    return (
        <div style={{ padding: '18px 0' }}>
            <center>
                <h1 style={{ color: '#fff' }}>{title}</h1>
            </center>
        </div>
    );
};

export default ChatForm;

import { UserContext } from 'context/UserContext';
import React, { useContext } from 'react';
import { Image, Modal } from 'semantic-ui-react';
import '../../css/InfoUser.css';

const InfoUser = () => {
    const { user } = useContext(UserContext);
    const { url: imageSrc, correo, idUsuario: carnet } = user;

    const handleClose = () => {
        window.location.href = '/main';
    };

    const handleUpdate = () => {
        prompt('goa');
    };
    return (
        <Modal open={true}>
            <Modal.Header>Perfil</Modal.Header>
            <Modal.Content image>
                <Image
                    id="image"
                    circular
                    size="medium"
                    src={imageSrc}
                    alt="preview"
                />

                <Modal.Description>
                    <div className="user-info-container">
                        <h1>Mi cuenta</h1>
                        <hr />
                        <div>
                            <p>
                                <b>Carnet:</b> {carnet}
                            </p>
                        </div>
                        <div>
                            <p>
                                <b>Usuario:</b> {correo}
                            </p>
                        </div>
                        <br />
                        <h1> Contraseña y autenticación</h1>
                        <hr />
                        <br />
                        <div id="flex" className="flex-container">
                            <b>
                                <p>Nueva Contraseña:</p>
                            </b>
                            <input
                                type="password"
                                placeholder="nueva contraseña"
                            />
                            <button
                                className="ui primary button"
                                onClick={handleUpdate}
                            >
                                Actualizar
                            </button>
                        </div>
                    </div>
                </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <div className="image-upload-actions">
                    <button className="ui red button" onClick={handleClose}>
                        Volver
                    </button>
                </div>
            </Modal.Actions>
        </Modal>
    );
};

export default InfoUser;

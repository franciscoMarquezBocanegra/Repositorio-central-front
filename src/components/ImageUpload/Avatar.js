import { UserContext } from 'context/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { Icon, IconGroup, Image } from 'semantic-ui-react';
import { fb } from 'services';
import { chatEngineApiClient } from 'services/chatEngineApiClient';
import { userApiclient } from 'services/userApiClient';
import swal from 'sweetalert';
import ImageUpload from './ImageUpload';

const Avatar = () => {
    const { user } = useContext(UserContext);
    const { correo } = user;
    const inputRef = useRef(null);
    const [image, setImage] = useState();

    useEffect(() => {}, [image]);

    const onFileAttach = file => {
        setImage(file);
    };

    const handleSubmit = croppedImage => {
        const storageRef = fb.storage.ref();
        const uploadRef = storageRef.child(`${correo}_avatar.jpg`);
        fb.auth
            .signInWithEmailAndPassword(user.correo, user.contraseña)
            .then(res => {
                console.log(res);
                console.log('file', image);
                chatEngineApiClient.updatePictureByUser(user, image);
            });
        // esto solo funciona si estamos auth con firebase
        uploadRef.put(croppedImage).then(() => {
            uploadRef.getDownloadURL().then(url => {
                fb.firestore
                    .collection('chatUsers')
                    .doc(correo)
                    .update({ avatar: url })
                    .then(() => {
                        user.url = url;
                        setImage(null);
                        userApiclient.putUrlUser(user.correo, url);
                    });
            });
            swal({
                title: 'Actualizando',
                icon: 'success',
                text: 'Imagen Actualizada',
                timer: '2000',
            });
        });
    };

    return (
        <>
            <input
                style={{ display: 'none' }}
                type="file"
                ref={inputRef}
                className="file-input"
                accept="image/jpeg,image/png,image/jpg"
                onChange={e => {
                    const file = e.target?.files?.[0];
                    if (file) {
                        onFileAttach(file);
                    }
                }}
            />
            {image && (
                <ImageUpload
                    crop
                    file={image}
                    header="Escoge tu perfil"
                    mode="message"
                    onSubmit={handleSubmit}
                    handleClose={() => {
                        setImage(null);
                        window.location.href = '/main';
                    }}
                />
            )}

            <div className="left-rail-header">
                <div className="current-user-info">
                    <IconGroup
                        onClick={() => {
                            const input = inputRef.current;
                            if (input) {
                                input.value = '';
                                input.click();
                            }
                        }}
                        className="user-avatar"
                        size="large"
                    >
                        {user.url ? (
                            <div>
                                <Image src={user.url} avatar />
                            </div>
                        ) : (
                            <div className="empty-avatar">
                                <Image
                                    src={'./img/no-photo-available.jpg'}
                                    avatar
                                />
                            </div>
                        )}

                        <Icon
                            corner
                            style={{ height: '10px', width: '10rem' }}
                            name="camera"
                            circular
                        />
                    </IconGroup>
                    <br />
                    <div style={{ color: '#fff' }} className="current-username">
                        {user.nombreCompleto}
                    </div>
                    <br />
                </div>
            </div>
        </>
    );
};

export default Avatar;

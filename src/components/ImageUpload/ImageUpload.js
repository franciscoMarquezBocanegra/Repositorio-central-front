import { UserContext } from 'context/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Image, Modal } from 'semantic-ui-react';

const ImageUpload = ({
    file,
    handleClose,
    onSubmit,
    crop = false,
    header = 'Enviar esta imagen?',
}) => {
    const { user } = useContext(UserContext);
    const [imageSrc, setImageSrc] = useState('');
    const cropRef = useRef();

    useEffect(() => {
        const fr = new FileReader();
        fr.onload = () => {
            setImageSrc(fr.result);
            user.url = fr.result;
        };
        fr.readAsDataURL(file);
    }, [file, user]);
    return (
        <Modal open={true}>
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content image>
                {crop ? (
                    <AvatarEditor
                        width={200}
                        border={50}
                        height={200}
                        ref={cropRef}
                        image={imageSrc}
                    />
                ) : (
                    <Image wrapped size="medium" src={imageSrc} alt="preview" />
                )}
                <Modal.Description>
                    <center>
                        <h1>{user.correo}</h1>
                        <p>
                            Hemos encontrado la siguiente imagen de avatar
                            asociada a tu usuario.
                        </p>
                        <b>
                            <i>
                                <p>¿Está bien actualizarlo con esta foto?</p>
                            </i>
                        </b>
                    </center>
                </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <div className="image-upload-actions">
                    <button className="ui red button" onClick={handleClose}>
                        Cancelar
                    </button>
                    <button
                        className="ui primary button"
                        onClick={() => {
                            if (crop && cropRef) {
                                const canvas = cropRef.current
                                    .getImageScaledToCanvas()
                                    .toDataURL();
                                fetch(canvas)
                                    .then(res => res.blob())
                                    .then(blob => onSubmit(blob));
                            } else {
                                onSubmit();
                            }
                        }}
                    >
                        Actualizar
                    </button>
                </div>
            </Modal.Actions>
        </Modal>
    );
};

export default ImageUpload;

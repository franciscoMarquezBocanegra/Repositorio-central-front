import { chatEngineApiClient } from './chatEngineApiClient';
import { fb } from './firebase';

export const fireBaseApiClient = (() => {
    return {
        postUser: async user => {
            const { correo: userName, contraseña: password } = user;
            fb.auth
                .createUserWithEmailAndPassword(userName, password)
                .then(res => {
                    if (res?.user?.uid) {
                        const data = { userName, avatar: '' };
                        chatEngineApiClient.postUser(user).then(() => {
                            fb.firestore
                                .collection('chatUsers')
                                .doc(userName)
                                .set(data);
                        });
                    }
                })
                .catch(() => {});
        },
    };
})();

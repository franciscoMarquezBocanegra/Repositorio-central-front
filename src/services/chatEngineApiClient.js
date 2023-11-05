import axios from 'axios';
import md5 from 'md5';

/* https://chatengine.io/docs/backend
https://axios-http.com/docs/post_example */

export const chatEngineApiClient = (() => {
    const URL = 'https://api.chatengine.io/';
    const PRIVATE_KEY = '434dfcfb-f05c-47c3-80b9-94ad38bed2f4';
    const PROJECT_ID = 'f2835e2c-343d-4ab3-9944-7e92dc3c6e98';

    const admin = {
        username: 'admin@escuelaing.edu.co',
        contraseña: '827ccb0eea8a706c4c34a16891f84e7b',
    };

    const authHeader = {
        'PRIVATE-KEY': PRIVATE_KEY,
    };

    const setData = user => {
        const { correo, contraseña: password, nombreCompleto } = user;
        const name = nombreCompleto.split('.');

        return {
            username: correo,
            secret: password,
            email: correo,
            first_name: name[0],
            last_name: name[1],
        };
    };

    return {
        postUser: async user => {
            const data = setData(user);
            const { email } = data;

            var config = {
                method: 'post',
                url: URL + 'users/',
                headers: authHeader,
                data: data,
            };

            await axios(config).then(response => {
                console.log(JSON.stringify(response.data));
            });

            chatEngineApiClient.addUserToChat(
                { correo: email },
                'Bienvenido'
            );
        },

        getUser: async ({ email, password }) => {
            const auth0 = {
                'Project-ID': PROJECT_ID,
                'User-Name': email.toString,
                'User-Secret': md5(password).toString,
            };

            await axios
                .get(`${URL}/chats`, { headers: auth0 })
                .then(response => {
                    console.log(JSON.stringify(response.data));
                });
        },

        darDeBaja: async (context, chat_id) => {
            var config = {
                url: `${URL}chats/${chat_id}/people/`,
                method: 'PUT',
                timeout: 0,
                headers: {
                    'Project-ID': PROJECT_ID,
                    'User-Name': admin.username,
                    'User-Secret': admin.contraseña,
                },
                data: { username: context.correo },
            };

            await axios(config).then(response => {
                console.log(JSON.stringify(response.data));
            });
        },

        updatePasswdByUser: async (user, newPasswd) => {
            /* https://api.chatengine.io/users/me/*/

            const { correo } = user;

            var config = {
                method: 'put',
                url: URL + `users/`,
                headers: authHeader,
                data: { username: correo, secret: md5(newPasswd) },
            };

            await axios(config).then(response => {
                console.log(JSON.stringify(response.data));
            });
        },

        updatePictureByUser: async (user, file) => {
            /* https://api.chatengine.io/users/me/*/

            const { correo, contraseña } = user;
            var config = {
                method: 'PATCH',
                url: URL + `users/146685`,
                headers: {
                    'Project-ID': PROJECT_ID,
                    'PRIVATE-KEY': PRIVATE_KEY,
                    'User-Name': correo,
                    'User-Secret': contraseña,
                },
                data: {
                    avatar: file,
                },
            };
            await axios(config)
                .then(response => {
                    console.log(JSON.stringify(response.data));
                })
                .catch(console.log);
        },

        getChatsByUser: async (context, isAdmin) => {
            var correo, contraseña;
            if (isAdmin) {
                correo = admin.username;
                contraseña = admin.contraseña;
            } else {
                correo = context.correo;
                contraseña = context.contraseña;
            }
            var settings = {
                url: `${URL}chats/`,
                method: 'GET',
                timeout: 0,
                headers: {
                    'Project-ID': PROJECT_ID,
                    'User-Name': correo,
                    'User-Secret': contraseña,
                },
            };

            const map = {};
            await axios(settings).then(({ data }) => {
                data.forEach(chat => {
                    const { id, title } = chat;
                    map[title] = id;
                });
            });
            return map;
        },

        addUserToChat: async (user, siglas) => {
            const map = await chatEngineApiClient.getChatsByUser(null, true);
            if (!(siglas in map)) {
                alert('Siglas o id de chat no validos.');
                return;
            }

            const chatId = map[siglas];
            const config = {
                method: 'POST',
                url: `https://api.chatengine.io/chats/${chatId}/people/`,
                headers: {
                    'Project-ID': PROJECT_ID,
                    'User-Name': admin.username,
                    'User-Secret': admin.contraseña,
                },
                data: { username: user.correo },
            };
            axios(config)
                .then(response => {
                    JSON.stringify(response.data);
                })
                .catch(console.log);
        },
    };
})();

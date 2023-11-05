const URL = 'http://localhost:8080';

export const userApiclient = (() => {
    return {
        postUser: async user => {
            const response = await fetch(`${URL}/RepositorioCentral/users/newUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error('The response Failed');
        },

        getUserByMail: async mail => {
            return await fetch(`${URL}/RepositorioCentral/users/${mail}`).then(response => {
                if (!response.ok) throw new Error('The response Failed');
                return response.json();
            });
        },

        putUrlUser: async (mail, newUrl) => {
            const response = await fetch(`${URL}/RepositorioCentral/users/${mail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newUrl,
            });
            if (!response.ok) throw new Error('The response Failed');
        },
    };
})();

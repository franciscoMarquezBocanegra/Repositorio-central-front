const URL = 'http://ec2-54-89-92-149.compute-1.amazonaws.com:8080';

export const decanaturaApiclient = (() => {
    return {
        getDecanaturas: async () => {
            return await fetch(`${URL}/RepositorioCentral/decanaturas`).then(response => {
                if (!response.ok) throw new Error('The response Failed');
                return response.json();
            });
        },
    };
})();

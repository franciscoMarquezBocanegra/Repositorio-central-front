const URL = 'http://localhost:8080';

export const decanaturaApiclient = (() => {
    return {
        getDecanaturas: async () => {
            return await fetch(`${URL}/U-cord/decanaturas`).then(response => {
                if (!response.ok) throw new Error('The response Failed');
                return response.json();
            });
        },
    };
})();

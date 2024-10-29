import axios from 'axios';

export const userTransactionsApi = axios.create({
    baseURL: 'https://wallet.b.goit.study',
});

export const setToken = token => {
    userTransactionsApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
    delete userTransactionsApi.defaults.headers.common.Authorization;
};

// Interceptor pentru a reîmprospăta tokenul sau a redirecționa la logare
userTransactionsApi.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            // Logica pentru token expirat:
            // 1. Încearcă reîmprospătarea tokenului, dacă API-ul suportă asta.
            // 2. Dacă reîmprospătarea eșuează, redirecționează utilizatorul la logare.

            // Exemplu de reîmprospătare:
            // const newToken = await refreshToken(); // Funcție de reîmprospătare a tokenului (implementată separat)
            // setToken(newToken);

            // Dacă nu se poate reîmprospăta, poți șterge tokenul și redirecționa:
            removeToken();
            window.location.href = '/login'; // Redirecționare la logare
        }
        return Promise.reject(error);
    }
);

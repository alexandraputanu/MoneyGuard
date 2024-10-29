import axios from 'axios';

// Configurare pentru API-ul Monobank
export const currencyApi = axios.create({
    baseURL: 'https://api.monobank.ua/',
});

// Configurare pentru retry logic în cazul erorilor 429
const MAX_RETRIES = 3; // Numărul maxim de încercări
const RETRY_DELAY = 1000; // Pauză de 1 sec

// Interceptor de retry
currencyApi.interceptors.response.use(
    response => response,
    error => {
        const { config, response } = error;
        if (response && response.status === 429 && config.__retryCount < MAX_RETRIES) {
            config.__retryCount = (config.__retryCount || 0) + 1;
            return new Promise(resolve => setTimeout(() => resolve(currencyApi(config)), RETRY_DELAY));
        }
        return Promise.reject(error);
    }
);

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/MoneyGuard/', // Înlocuiește cu numele repo-ului tău GitHub
    plugins: [react()],
});

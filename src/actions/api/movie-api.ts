import axios from 'axios';

export const movieApi = axios.create({
  baseURL: import.meta.env.VITE_MOVIE_DB_URL,
  params: {
    language: 'es-ES',
    api_key: import.meta.env.VITE_MOVIE_DB_KEY,
  },
});

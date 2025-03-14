import { GenreResponse, MovieResponse } from '../interfaces/movieResponse.ts';
import { movieApi } from './api/movie-api.ts';

export async function checkApiStatus() {
  try {
    const response = await movieApi.get('/movie/popular', {
      params: { page: 1 },
    });

    if (response.status !== 200) {
      throw new Error(`Error de API: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Error desconocido al conectar con la API',
    };
  }
}

export async function getMovies(page = 1, query = '', genreId?: number) {
  try {
    let endpoint = '';

    if (query) {
      endpoint = `/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`;
    } else if (genreId) {
      endpoint = `/discover/movie?with_genres=${genreId}&page=${page}`;
    } else {
      endpoint = `/movie/popular?page=${page}`;
    }

    const response = await movieApi.get(endpoint);

    if (response.status !== 200) {
      throw new Error(`Error al obtener películas: ${response.status}`);
    }

    const data: MovieResponse = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export async function getNowPlayingMovies(page = 1) {
  try {
    const endpoint = `/movie/now_playing?page=${page}`;

    const response = await movieApi.get(endpoint);

    if (response.status !== 200) {
      throw new Error(
        `Error al obtener películas en cartelera: ${response.status}`
      );
    }

    const data: MovieResponse = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
}

export async function getTopRatedMovies(page = 1) {
  try {
    const endpoint = `/movie/top_rated?page=${page}`;

    const response = await movieApi.get(endpoint);

    if (response.status !== 200) {
      throw new Error(
        `Error al obtener películas mejor calificadas: ${response.status}`
      );
    }

    const data: MovieResponse = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
}

export async function getUpcomingMovies(page = 1) {
  try {
    const endpoint = `/movie/upcoming?page=${page}`;

    const response = await movieApi.get(endpoint);

    if (response.status !== 200) {
      throw new Error(`Error al obtener próximos estrenos: ${response.status}`);
    }

    const data: MovieResponse = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
}

export async function getGenres() {
  try {
    const response = await movieApi.get('/genre/movie/list');

    if (response.status !== 200) {
      throw new Error(`Error al obtener géneros: ${response.status}`);
    }

    const data: GenreResponse = response.data;
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

import { movieApi } from '../api/movie-api';
import { Movie, MovieResponse } from '../../interfaces/movieResponse';

export const popularMoviesAction = async (): Promise<Movie[]> => {
  try {
    const { data } = await movieApi.get<MovieResponse>('/popular');
    return data.results;
  } catch (error) {
    console.error(error);
    throw 'Cannot load popular movies';
  }
};

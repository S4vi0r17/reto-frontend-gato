import { movieApi } from '../api/movie-api';
import { Movie, MovieResponse } from '../../interfaces/movieResponse';

export const upcomingMoviesAction = async (): Promise<Movie[]> => {
  try {
    const { data } = await movieApi.get<MovieResponse>('/movie/upcoming');
    return data.results;
  } catch (error) {
    console.error(error);
    throw 'Cannot load upcoming movies';
  }
};

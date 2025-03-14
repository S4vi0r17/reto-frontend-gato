import { movieApi } from '../api/movie-api';
import { Movie, MovieResponse } from '../../interfaces/movieResponse';

export const nowPlayingMoviesAction = async (): Promise<Movie[]> => {
  try {
    const { data } = await movieApi.get<MovieResponse>('/movie/now_playing?page=1');
    return data.results;
  } catch (error) {
    console.error(error);
    throw 'Cannot load now playing movies';
  }
};

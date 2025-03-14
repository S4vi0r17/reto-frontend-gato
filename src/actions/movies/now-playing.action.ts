import { Movie, MovieResponse } from '../../interfaces/movieResponse';
import { movieApi } from '../api/movie-api';

export const nowPlayingAction = async (): Promise<Movie[]> => {
  try {
    const { data } = await movieApi.get<MovieResponse>('/now_playing?page=1');
    return data.results;
  } catch (error) {
    console.error(error);
    throw 'Cannot load now playing movies';
  }
};

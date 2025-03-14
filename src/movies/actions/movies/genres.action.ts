import { movieApi } from '../api/movie-api';
import { Genre, GenreResponse } from '../../interfaces/movieResponse';

export const genresMoviesAction = async (): Promise<Genre[]> => {
  try {
    const { data } = await movieApi.get<GenreResponse>('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error(error);
    throw 'Cannot load now playing movies';
  }
};

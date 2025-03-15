import { movieApi } from '@/movies/actions/api/movie-api';
import { CompleteMovieResponse } from '../interfaces';

export const getMovieByIdAction = async (
  id: string
): Promise<CompleteMovieResponse | null> => {
  try {
    const response = await movieApi.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

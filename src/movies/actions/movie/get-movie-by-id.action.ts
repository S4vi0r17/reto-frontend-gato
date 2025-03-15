import { movieApi } from '../api/movie-api';
import { SimpleMovieResponse } from '../../interfaces/SimpeMovieResponse';

export const getMovieByIdAction = async (
  id: string
): Promise<SimpleMovieResponse | null> => {
  try {
    const response = await movieApi.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

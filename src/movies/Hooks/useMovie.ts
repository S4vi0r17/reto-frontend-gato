import { useQuery } from '@tanstack/react-query';
import { getMovieByIdAction } from '../actions/movie/get-movie-by-id.action';
import { SimpleMovieResponse } from '../interfaces/SimpeMovieResponse';

export const useMovieDetail = (movieId: string) => {
  const movieQuery = useQuery<SimpleMovieResponse | null>({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieByIdAction(movieId),
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    enabled: !!movieId,
  });

  return { movieQuery };
};

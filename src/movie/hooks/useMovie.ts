import { useQuery } from '@tanstack/react-query';
import { CompleteMovieResponse } from '../interfaces';
import { getMovieByIdAction } from '../actions/get-movie-by-id.action';

export const useMovieDetail = (movieId: string) => {
  const movieQuery = useQuery<CompleteMovieResponse | null>({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieByIdAction(movieId),
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    enabled: !!movieId,
  });

  return { movieQuery };
};

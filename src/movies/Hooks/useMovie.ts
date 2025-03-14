import { useQuery } from '@tanstack/react-query';

export const useMovie = (id: number) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieByIdAction(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const movieCastQuery = useQuery({
    queryKey: ['movie', id, 'cast'],
    queryFn: () => getMovieCastAction(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    movieQuery,
    movieCastQuery,
  };
};

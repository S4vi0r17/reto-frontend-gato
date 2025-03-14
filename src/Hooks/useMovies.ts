import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { nowPlayingMoviesAction } from '../actions/movies/now-playing.action';
import { popularMoviesAction } from '../actions/movies/popular.action';
import { topRatedMoviesAction } from '../actions/movies/top-rated.action';
import { upcomingMoviesAction } from '../actions/movies/upcoming.action';

export const useMovies = () => {
  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: nowPlayingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const popularQuery = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: popularMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const topRatedQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movies', 'topRated'],
    queryFn: ({ pageParam }) => {
      console.log({ pageParam });
      return topRatedMoviesAction({ page: pageParam });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const upcomingQuery = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: upcomingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery };
};

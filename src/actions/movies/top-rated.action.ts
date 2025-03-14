import { movieApi } from '../api/movie-api';
import { Movie, MovieResponse } from '../../interfaces/movieResponse';

interface Options {
  page?: number;
  limit?: number;
}

export const topRatedMoviesAction = async ({
  page = 1,
  limit = 10,
}: Options): Promise<Movie[]> => {
  try {
    const { data } = await movieApi.get<MovieResponse>('/movie/top_rated', {
      params: {
        page,
        limit,
      },
    });
    return data.results;
  } catch (error) {
    console.error(error);
    throw 'Cannot load top rated movies';
  }
};

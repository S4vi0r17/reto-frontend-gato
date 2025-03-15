import { CompleteMovieResponse } from '@/movie/interfaces';
import { Movie } from '../interfaces/movieResponse';

export const mapCompleteMovieResponseToMovie = (
  response: CompleteMovieResponse
): Movie => {
  return {
    adult: response.adult,
    backdrop_path: response.backdrop_path ? response.backdrop_path : null,
    genre_ids: response.genres.map((genre) => genre.id),
    id: response.id,
    original_language: response.original_language,
    original_title: response.original_title,
    overview: response.overview,
    popularity: response.popularity,
    poster_path: response.poster_path,
    release_date: response.release_date,
    title: response.title,
    video: response.video,
    vote_average: response.vote_average,
    vote_count: response.vote_count,
  };
};

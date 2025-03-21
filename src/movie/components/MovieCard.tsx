import { Link } from 'react-router';
import { Heart, Star } from 'lucide-react';
import { formatDate } from '@/common/helpers';
import { Genre, Movie } from '@/movies/interfaces/movieResponse';

interface Props {
  movie: Movie;
  genres: Genre[];
  isFavorite: boolean;
  toggleFavorite: (movie: Movie) => void;
  homePage?: boolean;
}

export const MovieCard = ({
  movie,
  genres,
  isFavorite,
  toggleFavorite,
  homePage = true,
}: Props) => {
  const movieGenres = genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .slice(0, 2);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`${homePage ? 'flex-shrink-0 w-[220px] snap-start' : ''}`}
    >
      <div className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-background border rounded-lg shadow-sm hover:shadow-md group">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="object-cover transition-transform duration-300 group-hover:scale-105 absolute inset-0 w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              No hay imagen
            </div>
          )}

          <button
            className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full transition-colors hover:bg-background"
            aria-label={
              isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
            }
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleFavorite(movie);
            }}
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-accent text-accent' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col flex-grow p-4">
          <h3 className="mb-2 text-base font-bold line-clamp-2">
            {movie.title}
          </h3>

          {movieGenres.length > 0 && (
            <div className="flex justify-center flex-wrap gap-1 mb-3">
              {movieGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-0.5 text-xs rounded-full bg-accent/50 text-secondary-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-muted-foreground">
              {formatDate(movie.release_date)}
            </span>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-3">
            {movie.overview || 'No hay descripción disponible.'}
          </p>
        </div>
      </div>
    </Link>
  );
};

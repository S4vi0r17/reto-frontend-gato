import { useNavigate, useParams } from 'react-router';
import { useFavoriteMoviesStore } from '@/movies/stores/favorites.store';
import { mapCompleteMovieResponseToMovie } from '@/movies/mappers/completemovie-to-movie.mapper';
import { useMovieDetail } from '../../movie/hooks/useMovie';
import {
  Heart,
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  Building,
} from 'lucide-react';

export const MoviePage = () => {
  const navigate = useNavigate();
  const { id: movieId } = useParams<{ id: string }>();

  const { favorites, toggleFavorite } = useFavoriteMoviesStore();

  const isFavorite = favorites.some((movie) => movie.id === +movieId!);

  const { movieQuery } = useMovieDetail(movieId!);

  if (movieQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const movie = movieQuery.data;

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Película no encontrada</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Volver
        </button>
      </div>
    );
  }

  // Función para formatear la fecha de lanzamiento
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return 'Fecha desconocida';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const movieGenres = movie.genres;

  return (
    <div className="relative min-h-screen pb-12">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 z-0">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-800"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>
      </div>

      {/* Botón de volver */}
      <div className="relative z-10 p-4">
        <button
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 md:py-8 md:pt-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
          {movie.title}
        </h1>

        {/* Géneros */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
          {movieGenres.map((genre) => (
            <span
              key={genre.id}
              className="px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm rounded-full bg-gray-800 text-white"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Información principal - Layout responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 md:gap-8">
          {/* Póster */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="aspect-[2/3] w-full max-w-[250px] sm:max-w-[300px] mb-4">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                  No hay imagen
                </div>
              )}
            </div>
          </div>

          {/* Detalles y descripción */}
          <div className="space-y-4 md:space-y-6">
            {/* Valoración */}
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-lg md:text-xl font-bold text-white">
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-sm md:text-base text-white/70">
                ({movie.vote_count} votos)
              </span>
            </div>

            {/* Descripción */}
            <div className="mb-4 md:mb-6">
              <p className="text-sm md:text-lg text-white/90 leading-relaxed">
                {movie.overview || 'No hay descripción disponible.'}
              </p>
            </div>

            {/* Detalles adicionales en una fila */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                <Calendar className="w-5 h-5 text-white/70 flex-shrink-0" />
                <div>
                  <p className="text-xs text-white/70">Fecha de estreno:</p>
                  <p className="text-sm text-white truncate">
                    {formatDate(movie.release_date)}
                  </p>
                </div>
              </div>

              {movie.runtime && (
                <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                  <Clock className="w-5 h-5 text-white/70 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/70">Duración:</p>
                    <p className="text-sm text-white">
                      {movie.runtime} minutos
                    </p>
                  </div>
                </div>
              )}

              {movie.production_companies &&
                movie.production_companies.length > 0 && (
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg">
                    <Building className="w-5 h-5 text-white/70 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/70">Productora:</p>
                      <p className="text-sm text-white truncate">
                        {movie.production_companies[0].name}
                      </p>
                    </div>
                  </div>
                )}
            </div>

            {/* Botón de favoritos */}
            <div className="pt-4">
              <button
                className={`w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  isFavorite
                    ? 'bg-accent hover:bg-accent/80 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                onClick={() =>
                  toggleFavorite(mapCompleteMovieResponseToMovie(movie))
                }
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
                />
                <span className="font-medium">
                  {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

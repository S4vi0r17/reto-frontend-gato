import { Heart } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie, Genre } from '../interfaces/movieResponse';

interface Props {
  movies: Movie[];
  genres: Genre[];
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

export const MoviesCarousel = ({
  movies,
  genres,
  favorites,
  toggleFavorite,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // navegar al slide anterior
  const goToPrevious = useCallback(() => {
    if (isTransitioning || movies.length <= 1) return;

    setIsTransitioning(true);

    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );

    // Permitir nueva transición después de completar la actual
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, movies.length]);

  // navegar al siguiente slide
  const goToNext = useCallback(() => {
    if (isTransitioning || movies.length <= 1) return;

    setIsTransitioning(true);

    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);

    // Permitir nueva transición después de completar la actual
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, movies.length]);

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;

    setIsTransitioning(true);

    setCurrentIndex(index);

    // Permitir nueva transición después de completar la actual
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Cambiar automáticamente de slide cada 6 segundos
  useEffect(() => {
    if (movies.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [goToNext, movies.length]);

  // EXTRA: Manejar con teclas de flecha
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">
          Cargando películas en cartelera...
        </p>
      </div>
    );
  }

  const movie = movies[currentIndex];
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  // Obtener los nombres de los géneros para esta película
  const movieGenres = genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => genre.name)
    .slice(0, 3);

  return (
    <section className="mb-12 w-full">
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden group">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-black transition-opacity duration-500 ease-in-out">
          {movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className={`w-full h-full object-cover opacity-50 transition-transform duration-700 ease-in-out ${
                isTransitioning ? 'scale-105' : 'scale-100'
              }`}
              loading="eager"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Contenido */}
        <div
          className={`absolute inset-0 flex flex-col justify-end p-6 md:p-10 transition-opacity duration-500 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="container mx-auto max-w-5xl">
            <h3 className="mb-3 text-3xl font-bold md:text-4xl text-primary">
              {movie.title}
            </h3>

            {movieGenres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movieGenres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 text-sm rounded-full bg-secondary/50 text-secondary-foreground backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="mb-6 text-base md:text-lg line-clamp-3 md:line-clamp-4 text-primary/90">
              {movie.overview || 'No hay descripción disponible.'}
            </p>

            <button
              onClick={() => toggleFavorite(movie)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              <Heart
                className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`}
              />
              {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            </button>
          </div>
        </div>

        {/* Controles */}
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 hidden md:flex">
          {movies.slice(0, Math.min(10, movies.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex % Math.min(10, movies.length)
                  ? 'w-6 bg-accent'
                  : 'w-2 bg-foreground/40'
              } disabled:opacity-50`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

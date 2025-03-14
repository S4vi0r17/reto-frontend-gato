import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Modal } from '../../common/components/Modal';
import { Genre, Movie } from '../interfaces/movieResponse';
import { usePagination } from '@/common';

interface MovieGridProps {
  genres: Genre[];
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  title?: string;
  itemsPerPage?: number;
}

export default function MovieGrid({
  genres,
  favorites,
  toggleFavorite,
  title,
  itemsPerPage = 12,
}: MovieGridProps) {
  // Estado para el diálogo de confirmación
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<Movie | null>(null);

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPageNumbers,
  } = usePagination({
    totalItems: favorites.length,
    itemsPerPage,
    initialPage: 1,
  });

  // Efecto para manejar que el body no se pueda desplazar cuando el modal está abierto
  useEffect(() => {
    if (isConfirmOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isConfirmOpen]);

  // Efecto para cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsConfirmOpen(false);
      }
    };

    if (isConfirmOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isConfirmOpen]);

  // Calcular los índices para las películas de la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, favorites.length);
  const currentMovies = favorites.slice(startIndex, endIndex);

  // Función para manejar el clic en el corazón de favoritos
  const handleFavoriteToggle = (movie: Movie) => {
    // Si la película ya está en favoritos (se intenta quitar)
    if (favorites.some((fav) => fav.id === movie.id)) {
      setMovieToRemove(movie);
      setIsConfirmOpen(true);
    } else {
      // Si se está añadiendo a favoritos, no mostrar confirmación
      toggleFavorite(movie);
    }
  };

  // Confirmar la eliminación del favorito
  const confirmRemoveFavorite = () => {
    if (movieToRemove) {
      toggleFavorite(movieToRemove);
      setMovieToRemove(null);
    }
    setIsConfirmOpen(false);
  };

  // Cancelar la eliminación
  const cancelRemoveFavorite = () => {
    setMovieToRemove(null);
    setIsConfirmOpen(false);
  };

  if (favorites.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl text-muted-foreground">
          No hay películas para mostrar.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 mx-auto sm:container sm:px-6 md:px-8">
      {title && (
        <h2 className="mb-4 text-xl font-bold sm:text-2xl md:mb-6">{title}</h2>
      )}

      {isConfirmOpen && (
        <Modal
          cancelRemoveFavorite={cancelRemoveFavorite}
          confirmRemoveFavorite={confirmRemoveFavorite}
          movieToRemove={movieToRemove}
        />
      )}

      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {currentMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genres={genres}
            isFavorite={favorites.some((fav) => fav.id === movie.id)}
            toggleFavorite={handleFavoriteToggle}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center mt-6 md:mt-8 gap-1 sm:gap-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <button
                  key={index}
                  onClick={() => goToPage(page)}
                  className={`min-w-[2rem] sm:min-w-[2.5rem] h-8 sm:h-10 px-2 sm:px-3 text-sm sm:text-base rounded-md transition-colors ${
                    page === currentPage
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-1 text-muted-foreground">
                  {page}
                </span>
              )
            )}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50"
            aria-label="Página siguiente"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie, Genre } from '../interfaces/movieResponse';
import { Link } from 'react-router';

interface MovieRowProps {
  movies: Movie[];
  genres: Genre[];
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  // Solo para infinite scroll
  loading?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
}

export default function MovieRow({
  movies,
  genres,
  favorites,
  toggleFavorite,
  loading = false,
  fetchNextPage,
  hasNextPage,
}: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isLoading = useRef(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Determinar si esta instancia tiene capacidad de infinite scroll
  const hasInfiniteScroll = Boolean(fetchNextPage && hasNextPage);

  // Resetear el estado de carga cada 200ms para evitar múltiples llamadas
  useEffect(() => {
    if (!hasInfiniteScroll) return;

    const intervalId = setInterval(() => {
      isLoading.current = false;
    }, 200);
    return () => clearInterval(intervalId);
  }, [hasInfiniteScroll, movies]);

  // Comprobar si se debe mostrar la flecha izquierda
  const checkScrollPosition = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 0);
      setShowRightArrow(
        rowRef.current.scrollLeft <
          rowRef.current.scrollWidth - rowRef.current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener('scroll', checkScrollPosition);
      return () => row.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Siempre revisamos la posición para las flechas
    checkScrollPosition();

    // Si no hay infinite scroll habilitado o ya estamos cargando, salimos
    if (!hasInfiniteScroll || isLoading.current || loading) return;

    const target = e.currentTarget;
    const contentOffset = target.scrollLeft;
    const contentSize = target.scrollWidth;
    const layoutMeasurement = target.clientWidth;

    // Cargar más cuando nos acercamos al final (600px antes del final)
    const isEndReached = contentOffset + layoutMeasurement + 600 >= contentSize;

    if (isEndReached) {
      isLoading.current = true;
      fetchNextPage?.();
    }
  };

  // Desplazamiento horizontal
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { current: row } = rowRef;
      const scrollAmount = row.clientWidth * 0.8;

      if (direction === 'left') {
        row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (movies.length === 0 && !loading) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No se encontraron películas.</p>
      </div>
    );
  }

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={rowRef}
        className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide snap-x"
        onScroll={handleScroll}
      >
        {movies.map((movie, index) => (
          <Link
            to={`/movie/${movie.id}`}
            key={`${movie.id}-${index}`}
            className="flex-shrink-0 w-[220px] snap-start"
          >
            <MovieCard
              movie={movie}
              genres={genres}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              toggleFavorite={toggleFavorite}
            />
          </Link>
        ))}

        {/* Indicador de carga solo para infinite scroll */}
        {hasInfiniteScroll && loading && (
          <div className="flex-shrink-0 w-[100px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        )}
      </div>

      {/* Flechas de navegación */}
      {showLeftArrow && (isHovering || movies.length > 5) && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-foreground backdrop-blur-sm shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {showRightArrow && (isHovering || movies.length > 5) && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-foreground backdrop-blur-sm shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Desplazar a la derecha"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

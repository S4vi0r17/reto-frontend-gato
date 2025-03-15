import { useState } from 'react';
import type { Movie } from '../interfaces/movieResponse';

export function useFavoriteModal(toggleFavorite: (movie: Movie) => void) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<Movie | null>(null);

  const openModalForFavorite = (movie: Movie) => {
    setMovieToRemove(movie);
    setIsConfirmOpen(true);
  };

  const confirmRemoveFavorite = () => {
    if (movieToRemove) {
      toggleFavorite(movieToRemove);
      setMovieToRemove(null);
    }
    setIsConfirmOpen(false);
  };

  const cancelRemoveFavorite = () => {
    setMovieToRemove(null);
    setIsConfirmOpen(false);
  };

  return {
    isConfirmOpen,
    movieToRemove,
    openModalForFavorite,
    confirmRemoveFavorite,
    cancelRemoveFavorite,
  };
}

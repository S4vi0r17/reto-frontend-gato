import { useState, useMemo } from 'react';
import type { Movie } from '../interfaces/movieResponse';

export type SortOption = 'popularity' | 'rating' | 'date' | 'none';

export function useFilterSort(favorites: Movie[]) {
  const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('none');

  const clearFilters = () => {
    setSelectedGenreIds([]);
    setSortOption('none');
  };

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenreIds((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const getSortOptionText = (option: SortOption) => {
    switch (option) {
      case 'popularity':
        return 'Más populares';
      case 'rating':
        return 'Mejor calificadas';
      case 'date':
        return 'Más recientes';
      default:
        return 'Ordenar por';
    }
  };

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...favorites];
    if (selectedGenreIds.length > 0) {
      result = result.filter((movie) =>
        movie.genre_ids.some((genreId) => selectedGenreIds.includes(genreId))
      );
    }
    switch (sortOption) {
      case 'popularity':
        return result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'rating':
        return result.sort(
          (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
        );
      case 'date':
        return result.sort((a, b) => {
          const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
          const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
          return dateB - dateA;
        });
      default:
        return result;
    }
  }, [favorites, selectedGenreIds, sortOption]);

  return {
    selectedGenreIds,
    sortOption,
    setSortOption,
    clearFilters,
    handleGenreToggle,
    getSortOptionText,
    filteredAndSortedMovies,
  };
}

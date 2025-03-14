import MovieGrid from '@/movies/components/MovieGrid';
import { useFavoriteMoviesStore } from '../stores/favorites.store';
import { useMovies } from '../Hooks/useMovies';

export const FavoritesPage = () => {
  const { genresQuery } = useMovies();
  const { favorites, toggleFavorite } = useFavoriteMoviesStore();
  return (
    <MovieGrid
      title="Favoritos"
      genres={genresQuery.data || []}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  );
};

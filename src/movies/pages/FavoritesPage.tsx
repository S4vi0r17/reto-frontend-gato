import { useFavoriteMoviesStore } from '../stores/favorites.store';
import { useMovies } from '../Hooks/useMovies';
import { MoviesGrid } from '../components/MoviesGrid';

export const FavoritesPage = () => {
  const { genresQuery } = useMovies();
  const { favorites, toggleFavorite } = useFavoriteMoviesStore();
  return (
    <MoviesGrid
      title="Mis Películas Favoritas"
      genres={genresQuery.data || []}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  );
};

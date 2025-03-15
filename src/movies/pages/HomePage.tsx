import { useMovies } from '../Hooks/useMovies';
import { useFavoriteMoviesStore } from '../stores/favorites.store';
import { MoviesCarousel } from '../components/MoviesCarousel';
import { MoviesRow } from '../components/MoviesRow';

export const HomePage = () => {
  const {
    nowPlayingQuery,
    popularQuery,
    topRatedQuery,
    upcomingQuery,
    genresQuery,
  } = useMovies();

  const { favorites, toggleFavorite } = useFavoriteMoviesStore();

  return (
    <>
      <MoviesCarousel
        movies={nowPlayingQuery.data || []}
        genres={genresQuery.data || []}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
      <main className="container px-4 mx-auto">
        <MoviesRow
          title="Películas Populares"
          movies={popularQuery.data || []}
          genres={genresQuery.data || []}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

        <MoviesRow
          title="Mejor Calificadas ( Infinity Scroll )"
          movies={topRatedQuery.data?.pages.flat() || []}
          genres={genresQuery.data || []}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          loading={topRatedQuery.isFetchingNextPage} // Para mostrar el loader
          fetchNextPage={topRatedQuery.fetchNextPage} // La función para cargar la siguiente página
          hasNextPage={topRatedQuery.hasNextPage} // Boolean que indica si hay más datos
        />

        <MoviesRow
          title="Próximos Estrenos"
          movies={upcomingQuery.data || []}
          genres={genresQuery.data || []}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </main>
    </>
  );
};

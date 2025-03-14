import MovieCarousel from '../components/MovieCarousel';
import MovieRow from '../components/MovieRow';
import { useMovies } from '../Hooks/useMovies';
import { useFavoriteMoviesStore } from '../stores/favorites.store';

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
      <section className="mb-12 w-full">
        <MovieCarousel
          movies={nowPlayingQuery.data || []}
          genres={genresQuery.data || []}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </section>
      <div className="container px-4 mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-bold">Películas Populares</h2>

          <MovieRow
            movies={popularQuery.data || []}
            genres={genresQuery.data || []}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">
            Mejor Calificadas ( Infinity Scroll )
          </h2>

          <MovieRow
            movies={topRatedQuery.data?.pages.flat() || []}
            genres={genresQuery.data || []}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            loading={topRatedQuery.isFetchingNextPage} // Para mostrar el loader
            fetchNextPage={topRatedQuery.fetchNextPage} // La función para cargar la siguiente página
            hasNextPage={topRatedQuery.hasNextPage} // Boolean que indica si hay más datos
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Próximos Estrenos</h2>

          <MovieRow
            movies={upcomingQuery.data || []}
            genres={genresQuery.data || []}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </section>
      </div>
    </>
  );
};

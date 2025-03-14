import MovieCarousel from '../components/Carousel';
import { NavBar } from '../components/NavBar';
import MovieRow from '../components/MovieRow';
import { useTMDB } from '../Hooks/useTMDB';
import { useMovies } from '../Hooks/useMovies';

export const HomePage = () => {
  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } =
    useMovies();
  const { genres, favorites, toggleFavorite } = useTMDB();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <section className="mb-12 w-full">
        <MovieCarousel
          movies={nowPlayingQuery.data || []}
          genres={genres}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      </section>
      <div className="container px-4 mx-auto">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Películas Populares</h2>
          </div>

          <MovieRow
            movies={popularQuery.data || []}
            genres={genres}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Mejor Calificadas</h2>

          <MovieRow
            movies={topRatedQuery.data?.pages.flat() || []}
            genres={genres}
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
            genres={genres}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </section>
      </div>
    </div>
  );
};

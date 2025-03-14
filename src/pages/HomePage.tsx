import MovieCarousel from '../components/Carousel';
import { NavBar } from '../components/NavBar';
import MovieRow from '../components/MovieRow';
import { useMovies } from '../Hooks/useMovies';

export const HomePage = () => {
  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    genres,
    loading,
    pages,
    totalPages,
    favorites,
    toggleFavorite,
    loadPopularMovies,
    loadTopRatedMovies,
    loadUpcomingMovies,
  } = useMovies();

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <section className="mb-12 w-full">
        <MovieCarousel
          movies={nowPlayingMovies}
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
            movies={popularMovies}
            genres={genres}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            loading={loading.popular}
            onLoadMore={() => loadPopularMovies()}
            hasMore={pages.popular < totalPages.popular}
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Mejor Calificadas</h2>

          <MovieRow
            movies={topRatedMovies}
            genres={genres}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            loading={loading.topRated}
            onLoadMore={() => loadTopRatedMovies()}
            hasMore={pages.topRated < totalPages.topRated}
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Próximos Estrenos</h2>

          <MovieRow
            movies={upcomingMovies}
            genres={genres}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            loading={loading.upcoming}
            onLoadMore={() => loadUpcomingMovies()}
            hasMore={pages.upcoming < totalPages.upcoming}
          />
        </section>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { usePagination } from '@/common';
import { useFavoriteModal } from '../Hooks/useFavoriteModal';
import { useFilterSort } from '../../common/hooks/useFilterSort';
import { MovieCard } from '@/movie/components/MovieCard';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  SortAsc,
  Check,
  ChevronDown,
  RefreshCcwDot,
} from 'lucide-react';
import type { Genre, Movie } from '../interfaces/movieResponse';

interface Props {
  genres: Genre[];
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  title?: string;
  itemsPerPage?: number;
}

export const MoviesGrid = ({
  genres,
  favorites,
  toggleFavorite,
  title,
  itemsPerPage = 12,
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    isConfirmOpen,
    openModalForFavorite,
    confirmRemoveFavorite,
    cancelRemoveFavorite,
  } = useFavoriteModal(toggleFavorite);

  const {
    selectedGenreIds,
    sortOption,
    setSortOption,
    clearFilters,
    handleGenreToggle,
    getSortOptionText,
    filteredAndSortedMovies,
  } = useFilterSort(favorites);

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPageNumbers,
    resetToFirstPage,
  } = usePagination({
    totalItems: filteredAndSortedMovies.length,
    itemsPerPage,
    initialPage: 1,
  });

  // Reiniciar la paginación al cambiar filtros u orden
  useEffect(() => {
    resetToFirstPage();
  }, [selectedGenreIds, sortOption, resetToFirstPage]);

  // Calcular las películas a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = filteredAndSortedMovies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFavoriteToggle = (movie: Movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      openModalForFavorite(movie);
    } else {
      toggleFavorite(movie);
    }
  };

  const refreshPage = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    window.location.reload()
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
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold sm:text-2xl mb-4">{title}</h2>

        {/* Dropdown de Ordenamiento */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[180px] justify-between"
            >
              <SortAsc className="h-4 w-4" />
              {getSortOptionText(sortOption)}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onSelect={() => setSortOption('none')}>
              Sin ordenar
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortOption('popularity')}>
              Más populares
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortOption('rating')}>
              Mejor calificadas
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortOption('date')}>
              Más recientes
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown de Filtros */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[180px] justify-between"
            >
              <Filter className="h-4 w-4" />
              Filtrar
              {selectedGenreIds.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-xs">
                  {selectedGenreIds.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Géneros</span>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => handleGenreToggle(genre.id)}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer ${
                      selectedGenreIds.includes(genre.id)
                        ? 'bg-primary border-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedGenreIds.includes(genre.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm truncate">{genre.name}</span>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          onClick={refreshPage}
          className="w-full sm:w-[180px]"
        >
          <RefreshCcwDot
            className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`}
          />
          Refrescar
        </Button>
      </div>

      {/* Modal de confirmación para eliminar favorito */}
      {isConfirmOpen && (
        <Dialog open={isConfirmOpen} onOpenChange={cancelRemoveFavorite}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de quitar esta película de favoritos?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={cancelRemoveFavorite}>Cancelar</Button>
              <Button onClick={confirmRemoveFavorite} variant="destructive">
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {filteredAndSortedMovies.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-xl text-muted-foreground">
            No hay películas que coincidan con los filtros seleccionados.
          </p>
          <Button onClick={clearFilters}>Limpiar filtros</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {[...currentMovies].reverse().map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={genres}
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
                toggleFavorite={handleFavoriteToggle}
                homePage={false}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-6 gap-2">
              <Button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {getPageNumbers().map((page, index) =>
                typeof page === 'number' ? (
                  <Button
                    key={index}
                    onClick={() => goToPage(page)}
                    className={`${
                      page === currentPage
                        ? 'bg-accent hover:bg-accent/70 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={index} className="px-1 text-gray-500">
                    {page}
                  </span>
                )
              )}
              <Button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

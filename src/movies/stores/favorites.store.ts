import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '../interfaces/movieResponse';

interface FavoriteMoviesState {
  favorites: Movie[];
}

interface FavoriteMoviesActions {
  toggleFavorite: (movie: Movie) => void;
}

const favoriteMoviesStore: StateCreator<
  FavoriteMoviesState & FavoriteMoviesActions
> = (set, get) => ({
  favorites: [],
  toggleFavorite: (movie: Movie) => {
    const { favorites } = get();
    if (favorites.some((m) => m.id === movie.id)) {
      set({
        favorites: favorites.filter((m) => m.id !== movie.id),
      });
    } else {
      set({
        favorites: [...favorites, movie],
      });
    }
  },
});

export const useFavoriteMoviesStore = create<
  FavoriteMoviesState & FavoriteMoviesActions
>()(persist(favoriteMoviesStore, { name: 'favorite-movies' }));

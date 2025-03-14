import { useEffect, useState } from 'react';
import { Genre, Movie } from '../interfaces/movieResponse';
import { getGenres } from '../actions/TMDB';

export const useTMDB = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(
    undefined
  );
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Cargar géneros
  const loadGenres = async () => {
    try {
      const genreData = await getGenres();
      setGenres(genreData);
    } catch (err) {
      console.error('Error loading genres:', err);
    }
  };

  // Cargar favoritos desde localStorage
  const loadFavorites = () => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  // Guardar favoritos en localStorage
  const saveFavorites = (updatedFavorites: Movie[]) => {
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  // Alternar favorito
  const toggleFavorite = (movie: Movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      saveFavorites(updatedFavorites);
    } else {
      saveFavorites([...favorites, movie]);
    }
  };

  // Efecto inicial
  useEffect(() => {
    loadGenres();
    loadFavorites();
  }, []);

  return {
    genres,
    selectedGenre,
    favorites,
    showFavorites,
    loadGenres,
    loadFavorites,
    saveFavorites,
    toggleFavorite,
    setSelectedGenre,
    setShowFavorites,
  };
};

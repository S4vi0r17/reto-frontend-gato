import { Outlet } from 'react-router';
import { useFavoriteMoviesStore } from '../stores/favorites.store';
import { NavBar } from '../components/NavBar';

export const MainLayout = () => {
  const { favorites } = useFavoriteMoviesStore();
  return (
    <div className="min-h-screen bg-background">
      <NavBar favorites={favorites} />
      <Outlet />
    </div>
  );
};

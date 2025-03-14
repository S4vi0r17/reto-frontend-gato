import { Film, Heart, ListFilter, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router';

export const NavBar = () => {
  const favoritesCount = 2;
  const theme = 'dark';

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Film className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">Gato Movies</span>
        </div>

        <div className="flex items-center gap-4">
          <Link to={'/category'} className="relative inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-secondary transition-colors">
            <ListFilter className={`w-5 h-5 text-primary`} />
            <span className="hidden sm:inline">Categorías</span>
          </Link>

          <Link to={'/favorites'} className="relative inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-secondary transition-colors">
            <Heart className={`w-5 h-5 text-primary`} />
            <span className="hidden sm:inline">Favoritos</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold bg-primary text-white rounded-full leading-none">
                {favoritesCount}
              </span>
            )}
          </Link>

          <button
            className="p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

import { Link, useLocation } from 'react-router';
import { Cat, Film, Heart } from 'lucide-react';
import { Movie } from '@/movies/interfaces/movieResponse';

interface Props {
  favorites: Movie[];
}

export const NavBar = ({ favorites }: Props) => {
  const favoritesCount = favorites.length;
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to={'/'} className="flex items-center gap-2">
          <Film className="w-8 h-8 text-accent" />
          <span className="text-xl font-bold">Gato Movies</span>
          <Cat className="w-8 h-8 text-accent" />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to={'/favorites'}
            className={`relative inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent/20 transition-colors ${
              pathname === '/favorites' ? 'bg-accent/20' : ''
            }`}
          >
            <Heart className={`w-5 h-5 fill-accent text-accent`} />
            <span className="hidden sm:inline">Favoritos</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-accent-foreground bg-accent rounded-full">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

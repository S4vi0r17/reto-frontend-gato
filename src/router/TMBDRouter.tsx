import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from '../movies/pages/HomePage';
import { MoviePage } from '../movies/pages/MoviePage';
import { CategoryPage } from '../movies/pages/CategoryPage';
import { NotFoundPage } from '../common/pages/NotFoundPage';
import { FavoritesPage } from '../movies/pages/FavoritesPage';
import { MainLayout } from '@/movies/layouts/MainLayout';

const TMBDRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/category/:id" element={<MoviePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TMBDRouter;

import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { CategoryPage } from '../pages/CategoryPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { MainLayout } from '../layouts/MainLayout';

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

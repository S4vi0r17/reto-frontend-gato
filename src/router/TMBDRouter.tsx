import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import { CategoryPage } from '../pages/CategoryPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { FavoritesPage } from '../pages/FavoritesPage';

const TMBDRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category" element={<FavoritesPage />} />
        <Route path="/category/:id" element={<MoviePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TMBDRouter;

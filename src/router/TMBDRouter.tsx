import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { MainLayout } from '@/movies/layouts/MainLayout';
import { MoviePage } from '@/movie/pages/MoviePage';
import { HomePage } from '@/movies/pages/HomePage';
import { FavoritesPage } from '@/movies/pages/FavoritesPage';

const TMBDRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/movie/:id' element={<MoviePage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
        </Route>
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TMBDRouter;

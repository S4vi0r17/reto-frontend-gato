import { useState, useCallback, useMemo, useEffect } from 'react';

interface Options {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
  maxPageNumbers?: number;
}

export function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 1,
  maxPageNumbers = 5,
}: Options) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  // Asegurarse de que la página actual es válida cuando cambia el total de páginas
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  // Ir a una página específica
  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNumber);
    },
    [totalPages]
  );

  // Resetear a la primera página
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Generar los números de página para mostrar
  const getPageNumbers = useCallback(() => {
    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfMaxPages = Math.floor(maxPageNumbers / 2);
    let startPage = Math.max(currentPage - halfMaxPages, 1);
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageNumbers + 1, 1);
    }

    const pages = [];

    // Añadir primera página y elipsis si es necesario
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // Añadir páginas intermedias
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Añadir última página y elipsis si es necesario
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxPageNumbers]);

  return {
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPageNumbers,
    resetToFirstPage,
  };
}

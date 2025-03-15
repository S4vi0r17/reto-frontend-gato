export const formatDate = (dateString: Date) => {
  if (!dateString) return 'Fecha desconocida';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

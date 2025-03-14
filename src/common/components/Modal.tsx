import { X } from 'lucide-react';
import { Movie } from '../../interfaces/movieResponse';

interface Props {
  cancelRemoveFavorite: () => void;
  confirmRemoveFavorite: () => void;
  movieToRemove: Movie | null;
}

export const Modal = ({
  cancelRemoveFavorite,
  confirmRemoveFavorite,
  movieToRemove,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between mb-4">
          <h3 id="modal-title" className="text-lg font-medium">
            ¿Quitar de favoritos?
          </h3>
          <button
            onClick={cancelRemoveFavorite}
            className="p-1 ml-auto bg-transparent rounded-full hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            ¿Estás seguro que deseas quitar "{movieToRemove?.title}" de tus
            favoritos? Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={cancelRemoveFavorite}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            onClick={confirmRemoveFavorite}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Sí, quitar
          </button>
        </div>
      </div>
    </div>
  );
};

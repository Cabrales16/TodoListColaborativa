import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function TareaModal({ tarea, isOpen, onClose }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detalles de la tarea"
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto relative outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      {tarea && (
        <>
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            ✕
          </button>

          {/* Contenido del modal */}
          {tarea.imagen && (
            <img
              src={tarea.imagen}
              alt={tarea.titulo}
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{tarea.titulo}</h2>
          <p className="text-gray-700 mb-2">{tarea.descripcion}</p>
          <p className="text-sm text-gray-500">Estado: {tarea.estado}</p>
          <p className="text-sm text-gray-500">Creada por: {tarea.creada_por}</p>
          <p className="text-sm text-gray-500">Editada por: {tarea.editada_por}</p>
        </>
      )}
    </ReactModal>
  );
}

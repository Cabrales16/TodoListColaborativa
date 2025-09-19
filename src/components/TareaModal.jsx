import React, { useState } from "react";
import ReactModal from "react-modal";
import TareaCrear from "./TareaCrear";

ReactModal.setAppElement("#root");

export default function TareaModal({ tarea, isOpen, onClose, onUpdate, onDelete }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const user = JSON.parse(localStorage.getItem("admins")); // Usuario autenticado

  // Maneja actualización de tarea
  const handleUpdate = (data) => {
    onUpdate({
      ...tarea,
      ...data,
      editada_por: user?.usuario || data.creada_por, // Marca quién editó
    });
    setModoEdicion(false);
    onClose();
  };

  // Maneja eliminación de tarea
  const handleDelete = () => {
    if (!user) return alert("Debe iniciar sesión para eliminar una tarea.");
    onDelete({
      ...tarea,
      estado: `Eliminada por ${user.usuario}`, // Guarda automáticamente el usuario logueado
    });
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detalles de la tarea"
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto relative outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      {/* Vista de detalles */}
      {tarea && !modoEdicion && (
        <>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            ✕
          </button>

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
          {tarea.editada_por && (
            <p className="text-sm text-gray-500">Editada por: {tarea.editada_por}</p>
          )}

          {/* Botones de acción */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setModoEdicion(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </>
      )}

      {/* Vista de edición */}
      {tarea && modoEdicion && (
        <TareaCrear
          initialData={tarea}
          onSubmit={handleUpdate}
          onCancel={() => setModoEdicion(false)}
        />
      )}
    </ReactModal>
  );
}

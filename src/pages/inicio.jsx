import React, { useEffect, useState } from "react";
import api from "../service/api"; //traemos el api
import TareaModal from "../components/TareaModal";
import TareaCrear from "../components/TareaCrear";

export default function Inicio() {
  // Estado para guardar las tareas cargadas desde la API/json-server
  const [tareas, setTareas] = useState([]);

  // Estado para manejar cuál tarea está seleccionada
  const [selectedTarea, setSelectedTarea] = useState(null);

  // Estado para manejar si está activo el modo de creación de tareas
  const [modoCrear, setModoCrear] = useState(false);

  // useEffect: carga las tareas al montar el componente desde la API
  useEffect(() => {
    api.get("/tareas")
      .then((response) => setTareas(response.data)) // guarda las tareas en el estado
      .catch((error) => console.error("Error fetching tareas:", error));
  }, []);

  // Abre el modal de detalles asignando la tarea seleccionada
  const abrirModal = (tarea) => setSelectedTarea(tarea);

  // Cierra el modal de detalles
  const cerrarModal = () => setSelectedTarea(null);

  // Crear nueva tarea
  const crearTarea = async (nuevaTarea) => {
    try {
      const response = await api.post("/tareas", nuevaTarea);
      setTareas((prev) => [...prev, response.data]); // agrega la nueva tarea al estado
      setModoCrear(false); // cierra el modal de creación
    } catch (error) {
      console.error("Error creando tarea:", error);
    }
  };

  // Actualizar tarea existente
  const actualizarTarea = async (tareaEditada) => {
    try {
      await api.put(`/tareas/${tareaEditada.id}`, tareaEditada);
      // reemplaza en el estado la tarea editada
      setTareas((prev) =>
        prev.map((t) => (t.id === tareaEditada.id ? tareaEditada : t))
      );
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (tareaEliminada) => {
    try {
      await api.delete(`/tareas/${tareaEliminada.id}`);
      // elimina la tarea del estado local
      setTareas((prev) => prev.filter((t) => t.id !== tareaEliminada.id));
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-12 min-h-screen bg-gray-100">
      {/* Título principal */}
      <h1 className="text-4xl font-bold mb-4">
        ¡Bienvenido a la lista de tareas colaborativa!
      </h1>
      <p className="text-lg text-gray-700">
        Organiza y comparte tus tareas con facilidad.
      </p>

      {/* Botón para abrir modal de creación */}
      <button
        onClick={() => setModoCrear(true)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Crear Tarea
      </button>

      {/* Grid que muestra todas las tareas */}
      <div className="mt-8 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tareas.map((tarea) => (
          <div
            key={tarea.id}
            className="p-6 bg-white border rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
            onClick={() => abrirModal(tarea)} // abre modal al hacer clic
          >
            {/* Imagen de la tarea si existe */}
            {tarea.imagen && (
              <img
                src={tarea.imagen}
                alt={tarea.titulo}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}
            <h3 className="text-lg font-semibold mb-2">{tarea.titulo}</h3>
            <p className="text-sm text-gray-600">{tarea.estado}</p>
          </div>
        ))}
      </div>

      {/* Modal de detalles/edición de tarea */}
      <TareaModal
        tarea={selectedTarea}
        isOpen={!!selectedTarea} // true si hay tarea seleccionada
        onClose={cerrarModal}
        onUpdate={actualizarTarea}
        onDelete={eliminarTarea}
      />

      {/* Modal de creación de nueva tarea */}
      {modoCrear && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            {/* Botón para cerrar modal de creación */}
            <button
              onClick={() => setModoCrear(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Crear nueva tarea</h2>

            {/* Formulario de creación TareaCrear */}
            <TareaCrear
              onSubmit={crearTarea}
              onCancel={() => setModoCrear(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

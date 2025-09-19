import React, { useEffect, useState } from "react";
import TareaModal from "../components/TareaModal";

export default function Inicio() {
  const [tareas, setTareas] = useState([]);
  const [selectedTarea, setSelectedTarea] = useState(null);

  useEffect(() => {
    fetch("/tareas.json")
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.error("Error fetching tareas.json:", error));
  }, []);

  const abrirModal = (tarea) => setSelectedTarea(tarea);
  const cerrarModal = () => setSelectedTarea(null);

  return (
    <div className="flex flex-col items-center pt-12 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        ¡Bienvenido a la lista de tareas colaborativa!
      </h1>
      <p className="text-lg text-gray-700">
        Organiza y comparte tus tareas con facilidad.
      </p>

      {/* Contenedor de tareas como grid de cards */}
      <div className="mt-8 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold mb-6">Tus Tareas</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tareas.map((tarea) => (
            <div
              key={tarea.id}
              className="p-6 bg-white border rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
              onClick={() => abrirModal(tarea)}
            >
              {tarea.imagen && (
                <img
                  src={tarea.imagen}
                  alt={tarea.titulo}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{tarea.titulo}</h3>
              <p className="text-sm text-gray-600 mb-2">Estado: {tarea.estado}</p>
              {tarea.asignadaA && (
                <p className="text-sm text-gray-500">Asignada a: {tarea.asignadaA}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal separado en componente */}
      <TareaModal
        tarea={selectedTarea}
        isOpen={!!selectedTarea}
        onClose={cerrarModal}
      />
    </div>
  );
}

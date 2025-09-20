import React, { useState } from "react";
import { BookmarkIcon } from '@heroicons/react/24/solid'
import { XMarkIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

export default function TareaCrear({ initialData = {}, onSubmit, onCancel }) {
  // initialData trae datos iniciales de la tarea (si se edita una existente)
  // onSubmit es la función que se ejecuta al guardar
  // onCancel es la otra función que se ejecuta al cancelar

  // Estado para el título de la tarea inicializado con lo que venga en initialData o vacío
  const [titulo, setTitulo] = useState(initialData.titulo || "");

  // estado para la descripción de la tarea inicializado con lo que venga en initialData o vacío
  const [descripcion, setDescripcion] = useState(initialData.descripcion || "");


  const user = JSON.parse(localStorage.getItem("admins"));
  // Obtenemos los datos del usuario logueado desde localStorage


  const handleSubmit = (e) => { // Función que maneja el envío del formulario
    e.preventDefault(); // Evita que la página se recargue al enviar el form

    // Si no hay usuario logueado, mostramos alerta y salimos
    if (!user) return alert("Debe iniciar sesion");

    // Creamos el objeto de la nueva tarea
    const nuevaTarea = {
      ...initialData, // Traemos los  datos existentes si estamos editando
      titulo, // nuevo título
      descripcion, // nueva descripción
      estado: initialData.estado || "pendiente", // si no hay estado, se pone "pendiente"
      creada_por: initialData.creada_por || user.usuario, // quien la creó
      editada_por: initialData.id ? user.usuario : "" // guardamos quién editó, si es que se lega a editar
    };

    onSubmit(nuevaTarea); // Llamamos la función pasada por props, enviando la tarea creada/actualizada
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)} // actualiza el estado en cada cambio
        className="w-full border px-3 py-2 rounded"
        required
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)} // actualiza el estado en cada cambio
        className="w-full border px-3 py-2 rounded"
      >
      </textarea>


      <div className="flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <BookmarkIcon className="h-5 w-5" />
          Guardar
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          <XMarkIcon className="h-5 w-5" />
          Cancelar
        </button>
      </div>
    </form>
  );
}

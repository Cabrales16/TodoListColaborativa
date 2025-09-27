import React, { useEffect, useState, useCallback } from "react";
import api from "../service/api"; //traemos el api
import TareaModal from "../components/TareaModal";
import TareaCrear from "../components/TareaCrear";
import BarraBusqueda from "../components/SearchTarea"
import { CircularProgress } from "@mui/material";
import { PlusIcon } from '@heroicons/react/24/solid'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { PowerIcon } from '@heroicons/react/24/outline'; 

import { useNavigate } from "react-router-dom"; // Hook para redirigir entre páginas

export default function Inicio() {
  // Estado para guardar las tareas cargadas desde la API/json-server
  const [tareas, setTareas] = useState([]);
  const [filtrados, setFiltrados] = useState([]); // Estado para tareas filtradas
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [buscando, setBuscando] = useState(""); // Estado para manejar el texto de búsqueda
  const [error, setError] = useState(null); // Estado para manejar errores

  const navigate = useNavigate(); // Para navegar a otra ruta si el login es exitoso

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("admins");
    navigate("/");
    toast.info("Has cerrado sesión");
  }
  const obtenerTareas = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {
      const { response } = await api.get("/tareas");
      setTareas(response);
      setFiltrados(response);
    }
    catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
    
    finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerTareas();
  }, [obtenerTareas]);
  
  const filtrarTareas = useCallback(
    (query) => {
      setBuscando(true)

      setTimeout(() => {
        if (query.trim() === '') {
          setFiltrados(tareas)
        } else {
          const q = query.trim().toLowerCase()
          const resultados = tareas.filter((t) =>
            [t.titulo, t.creada_por, t.editada_por, t.estado, t.descripcion].some(
              (campo) => String(campo).toLowerCase().includes(q)
            )
          )
          setFiltrados(resultados)
          toast.info('Las tareas han sido filtradas')
        }
        setBuscando(false)
      }, 1000) // Simula un retardo de búsqueda
    },
    [tareas]
  )

  // Estado para manejar cuál tarea está seleccionada
  const [selectedTarea, setSelectedTarea] = useState(null);

  // Estado para manejar si está activo el modo de creación de tareas
  const [modoCrear, setModoCrear] = useState(false);

  // useEffect: carga las tareas al montar el componente desde la API
  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await api.get("/tareas");
        setTareas(response.data); // guarda las tareas en el estado
      } catch (error) {
        console.error("Error fetching tareas:", error);
      }
    };

  fetchTareas();
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
      toast.success("Tarea creada con éxito");
    } catch (error) {
      console.error("Error creando tarea:", error);
      toast.error("Error creando la tarea");
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
      toast.success("Tarea actualizada con éxito");
    } catch (error) {
      console.error("Error actualizando tarea:", error);
      toast.error("Error actualizando la tarea");
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (tareaEliminada) => {
    try {
      await api.delete(`/tareas/${tareaEliminada.id}`);
      // elimina la tarea del estado local
      setTareas((prev) => prev.filter((t) => t.id !== tareaEliminada.id));
      toast.success("Tarea eliminada con éxito");
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      toast.error("Error eliminando la tarea");
    }
  };

  // ---------- PAGINACIÓN ----------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // puedes ajustar a tu gusto

  const totalPages = Math.ceil(tareas?.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTareas = filtrados?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
        {/* Botón de cerrar sesión */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={handleLogout} 
            className="mt-4 text-blue-600 hover:underline"
          >
            <PowerIcon className="h-5 w-5 inline-block mr-1" />
            Cerrar sesión
          </button>
        </div>
        <div className="flex flex-col items-center justify-center text-center space-y-2 px-4">
          {/* Título principal */}
          <h1 className="text-4xl font-bold mb-4">
            ¡Bienvenido a la lista de tareas colaborativa!
          </h1>
          <p className="text-lg text-gray-700">
            Organiza y comparte tus tareas con facilidad.
          </p>
        </div>

        {/* Barra de búsqueda y botón de crear tarea*/}
        <div className="w-full max-w-5xl flex justify-between items-center mt-6 space-x-4">
          <div className="w-full">
            <BarraBusqueda onSearch={filtrarTareas} />
          </div>

          <button
            onClick={() => setModoCrear(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5" />
            <strong>Crear</strong>
          </button>
        </div>

        <div>
          {loading && <p className="mt-6 text-center flex">Cargando tareas...</p>}

          {error && !loading && (
            <div className="mt-6 mx-auto max-w-md rounded bg-red-50 border border-red-200 p-3 text-red-700">
              {error} — verifica que el API esté arriba en{' '}
              <button className="ml-2 underline" onClick={obtenerTareas}>
                Reintentar
              </button>
            </div>
          )}

          {buscando && !loading && !error && (
            <div className="mt-6 text-center flex items-center justify-center">
              <CircularProgress size={32} />
              <span className="ml-2 text-gray-600">Buscando…</span>
            </div>
          )}

          {!loading && !error && filtrados?.length === 0 && (
            <p className="mt-6 text-center text-gray-600">
              Sin resultados para tu búsqueda
            </p>
          )}

          {!buscando && (
            <div className="mt-8 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Grid que muestra todas las tareas */}
            {currentTareas?.map((tarea) => (
              <div
                key={tarea.id}
                className="p-6 bg-white border rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
                
              >

                {/* Imagen de la tarea si existe */}
                {tarea.imagen && (
                  <img
                    src={tarea.imagen}
                    alt={tarea.titulo}
                    className="w-full h-40 object-cover rounded-md mb-4"
                    onClick={() => abrirModal(tarea)}
                  />
                )}

                <h3
                  className={`text-lg font-semibold mb-2 ${
                    tarea.estado === "completada" ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => abrirModal(tarea)}
                >
                  {tarea.titulo}
                </h3>
                <p className="text-sm text-gray-600">{tarea.descripcion}</p>
                                {/* Checkbox para cambiar estado */}
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    checked={tarea.estado === "completada"}
                    onChange={(e) => {
                      const nuevoEstado = e.target.checked ? "completada" : "pendiente";
                      const tareaActualizada = { ...tarea, estado: nuevoEstado };
                      actualizarTarea(tareaActualizada);
                    }}
                    className="mr-2 w-5 h-5 cursor-pointer accent-green-600"
                  />
                  <span className="text-sm text-gray-700">
                    {tarea.estado === "completada" ? "Completada" : "Pendiente"}
                  </span>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
        
        {/* PAGINACIÓN */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              className={`flex items-center gap-2 px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Volver
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 hover:bg-blue-600 hover:text-white"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={`flex items-center gap-2 px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Modal de detalles/edición de tarea */}
        <AnimatePresence>
          {selectedTarea && (
            <motion.div
              className="fixed inset-0 flex justify-center items-center bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TareaModal
                  tarea={selectedTarea}
                  isOpen={!!selectedTarea}
                  onClose={cerrarModal}
                  onUpdate={actualizarTarea}
                  onDelete={eliminarTarea}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de creación de nueva tarea */}
        <AnimatePresence>
          {modoCrear && (
            <motion.div
              className="fixed inset-0 flex justify-center items-center bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
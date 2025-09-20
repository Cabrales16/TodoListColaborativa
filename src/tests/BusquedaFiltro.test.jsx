import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Inicio from "../pages/inicio";
import { MemoryRouter } from "react-router-dom";
import api from "../service/api.jsx"; // 🔹 Importamos el mock

// 🔹 Mockeamos el módulo api
jest.mock("../service/api.jsx", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("Componente barra de búsqueda", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renderiza las tareas filtradas según la búsqueda", async () => {
    // 🔹 Simulamos que la API devuelve tareas
    api.get.mockResolvedValueOnce({
      data: [
        { id: 1, titulo: "Comer frutas", descripcion: "Plátano y manzana", estado: "pendiente" },
        { id: 2, titulo: "Hacer ejercicio", descripcion: "Correr 30 min", estado: "hecho" },
      ],
    });

    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    // 🔹 Esperamos a que aparezcan las tareas de la API
    expect(await screen.findByText("Comer frutas")).toBeInTheDocument();
    expect(await screen.findByText("Hacer ejercicio")).toBeInTheDocument();

    // 🔹 Filtramos por "Comer frutas"
    fireEvent.change(
      screen.getByPlaceholderText("Buscar titulo, descripción o estado..."),
      { target: { value: "Comer frutas" } }
    );

    // 🔹 Verificamos que solo aparece la tarea filtrada
    expect(await screen.findByText("Comer frutas")).toBeInTheDocument();
  });
});

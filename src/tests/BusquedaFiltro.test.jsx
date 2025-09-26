import React from "react";
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import api from "../service/api.jsx";
import { MemoryRouter } from "react-router-dom";
import Inicio from "../pages/inicio.jsx";
import { describe, beforeEach, test, expect } from "@jest/globals";

// Mock del servicio API
/* global jest */
jest.mock("../service/api.jsx", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

describe("Componente barra de búsqueda", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {}); // evita logs de error en tests
  });

  test("Renderiza las tareas filtradas según la búsqueda", async () => {
    const mockTareas = [
      { 
        id: 1, 
        titulo: "Comer frutas", 
        descripcion: "Plátano y manzana", 
        estado: "completada", 
        creada_por: "usuario", 
        editada_por: "usuario" 
      },
      { 
        id: 2, 
        titulo: "Hacer ejercicio", 
        descripcion: "Correr 30 min", 
        estado: "pendiente", 
        creada_por: "usuario", 
        editada_por: "usuario" 
      },
    ];

    // Mock de respuesta de la API
    api.get.mockResolvedValue({
      response: mockTareas,
      data: mockTareas
    });

    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    // Espera a que desaparezca el indicador de carga
    await waitForElementToBeRemoved(() => screen.getByText(/Cargando tareas.../i));

    // Verifica que ambas tareas estén inicialmente
    expect(await screen.findByText("Comer frutas")).toBeInTheDocument();
    expect(await screen.findByText("Hacer ejercicio")).toBeInTheDocument();

    // Input de búsqueda
    const searchInput = screen.getByPlaceholderText("Buscar titulo, descripción o estado...");

    // Simula búsqueda
    fireEvent.change(searchInput, { target: { value: "frutas" } });

    // Espera indicador de búsqueda
    await waitFor(() => {
      expect(screen.getByText(/Buscando…/i)).toBeInTheDocument();
    });

    // Espera que desaparezca el indicador de búsqueda
    await waitForElementToBeRemoved(() => screen.getByText(/Buscando…/i), { timeout: 2000 });
  });

});

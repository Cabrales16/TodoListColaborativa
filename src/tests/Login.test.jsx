import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/login.jsx";
import { MemoryRouter } from "react-router-dom"; 
import api from '../service/api.jsx';

// Simulamos el módulo api y el hook navigate
jest.mock("../service/api.jsx", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
}));

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Componente Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza los inputs y el botón", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  test("muestra error cuando las credenciales son incorrectas", async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() =>
      expect(screen.getByText(/Credenciales incorrectas/i)).toBeInTheDocument()
    );
  });

  test("redirige a /inicio si el login es exitoso", async () => {
    api.get.mockResolvedValueOnce({
      data: [{ id: 1, correo: "test@test.com" }],
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Correo"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    await waitFor(() =>
      expect(mockedNavigate).toHaveBeenCalledWith("/inicio")
    );
  });
});
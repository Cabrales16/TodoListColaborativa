# 📋 Todo List Colaborativa

Una aplicación web colaborativa para gestionar tareas de forma sencilla, moderna y en equipo.
Permite crear, visualizar, editar y eliminar tareas, además de contar con autenticación de administrador.

## ✨ Características

- 🔑 Inicio de sesión de administradores (usando json-server como backend simulado).

- 📝 CRUD de tareas (crear, leer, actualizar y eliminar).

- 📷 Posibilidad de añadir imágenes a las tareas.

- 🖼️ Interfaz intuitiva y atractiva con Tailwind CSS.

- ⚡ Modal para detalles de tareas y creación.

- 🔒 Manejo de sesión con localStorage.

## 🛠️ Tecnologías utilizadas

- React
 (Frontend con Hooks)

- React Router
 (Navegación entre pantallas)

- Tailwind CSS
 (Estilos modernos y responsivos)

- Axios
 (Cliente HTTP para consumir API)

- json-server
 (Simulación de backend)

## ⚙️ Instalación y configuración
1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/todo-list-colaborativa.git
cd todo-list-colaborativa
```

2️⃣ Instalar dependencias
```bash
npm install
```

3️⃣ Configurar el backend (json-server)

Crea un archivo db.json en la raíz del proyecto con la estructura inicial:

```json
{
  "tareas": [
    {
      "id": 1,
      "titulo": "Tarea de ejemplo",
      "estado": "Pendiente",
      "imagen": "https://via.placeholder.com/300"
    }
  ],
  "admins": [
    {
      "id": 1,
      "correo": "admin@demo.com",
      "contrasena": "123456"
    }
  ]
}
```


Luego ejecuta el servidor:

```bash
npx json-server --watch db.json --port 3001
```


⚠️ Por defecto, este proyecto espera que la API esté en http://localhost:3001.

## 4️⃣ Ejecutar la aplicación React
npm run dev


Por defecto, se abrirá en http://localhost:5173
.

## 🚀 Uso

1. Inicia sesión con un admin registrado en db.json.

    - Ejemplo:

        - Correo: admin@demo.com

        - Contraseña: 123456

2. En la pantalla principal podrás:

    - ➕ Crear nuevas tareas (con título, estado e imagen).

    - 👀 Ver detalles de una tarea haciendo clic en ella.

    - ✏️ Editar tareas desde el modal de detalles.

    - 🗑️ Eliminar tareas de forma inmediata.

## 📂 Estructura de carpetas
```bash
src/

│── components/       # Componentes reutilizables (Modal, CrearTarea, etc.)
│── layouts/          # Layouts (si aplica en el futuro)
│── pages/            # Páginas principales (Inicio, Login)
│── service/          # Configuración de axios (api.js)
│── App.jsx           # Enrutamiento principal
│── main.jsx          # Punto de entrada
```

## ✅ Próximas mejoras

- 👥 Autenticación de múltiples usuarios.

- 🔔 Notificaciones en tiempo real (con WebSockets).

- 📊 Filtros y etiquetas para organizar tareas.

- 🌙 Modo oscuro.

## 👨‍💻 Autor

Desarrollado por:
- Andrés Cabrales Baena
- Gerson Samuel Sanchez Garcia
- Sofia Segura Guacare
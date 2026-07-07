# Frontend Colegio Carlos Medinaceli - Ariel

Frontend desarrollado con React + Vite para consumir el backend publicado en Render.

## Backend conectado

```txt
https://exmanefinal-arielmontesinos.onrender.com/api
```

## Módulos

- Inicio con resumen general.
- Historia institucional.
- Gestión de estudiantes.
- Gestión de docentes.
- Gestión de cursos.
- Gestión de avisos.
- Login administrativo.

## Ejecutar

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
```

## Subir a Render como Static Site

- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

El frontend ya tiene configurado `VITE_API_URL` en el archivo `.env`.

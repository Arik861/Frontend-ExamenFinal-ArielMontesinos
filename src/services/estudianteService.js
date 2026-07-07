import { actualizar, crear, eliminar, listar } from "./apiClient.js";

const RUTA = "/estudiantes";

export const listarEstudiantes = () => listar(RUTA);
export const crearEstudiante = (data) => crear(RUTA, data);
export const actualizarEstudiante = (id, data) => actualizar(RUTA, id, data);
export const eliminarEstudiante = (id) => eliminar(RUTA, id);

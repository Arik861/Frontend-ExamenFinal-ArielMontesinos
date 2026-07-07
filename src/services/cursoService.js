import { actualizar, crear, eliminar, listar } from "./apiClient.js";

const RUTA = "/cursos";

export const listarCursos = () => listar(RUTA);
export const crearCurso = (data) => crear(RUTA, data);
export const actualizarCurso = (id, data) => actualizar(RUTA, id, data);
export const eliminarCurso = (id) => eliminar(RUTA, id);

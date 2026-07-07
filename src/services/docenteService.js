import { actualizar, crear, eliminar, listar } from "./apiClient.js";

const RUTA = "/docentes";

export const listarDocentes = () => listar(RUTA);
export const crearDocente = (data) => crear(RUTA, data);
export const actualizarDocente = (id, data) => actualizar(RUTA, id, data);
export const eliminarDocente = (id) => eliminar(RUTA, id);

import { actualizar, crear, eliminar, listar } from "./apiClient.js";

const RUTA = "/avisos";

export const listarAvisos = () => listar(RUTA);
export const crearAviso = (data) => crear(RUTA, data);
export const actualizarAviso = (id, data) => actualizar(RUTA, id, data);
export const eliminarAviso = (id) => eliminar(RUTA, id);

import { crear } from "./apiClient.js";

export function iniciarSesion(credenciales) {
  return crear("/acceso/login", credenciales);
}

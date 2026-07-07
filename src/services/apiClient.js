const API_BASE_URL = import.meta.env.VITE_API_URL;

function buildUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Error HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export function listar(path) {
  return request(path);
}

export function crear(path, data) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function actualizar(path, id, data) {
  return request(`${path}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function eliminar(path, id) {
  return request(`${path}/${id}`, {
    method: "DELETE",
  });
}

export { API_BASE_URL };

import { useEffect, useState } from "react";
import {
  actualizarDocente,
  crearDocente,
  eliminarDocente,
  listarDocentes,
} from "../../services/docenteService.js";

const FORM_INICIAL = {
  nombre: "",
  especialidad: "",
  correo: "",
  telefono: "",
  disponible: true,
};

function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setDocentes(await listarDocentes());
      setError("");
    } catch {
      setError("No se pudo cargar docentes desde el backend.");
    }
  };

  useEffect(() => {
    let componenteActivo = true;

    async function cargarInicial() {
      try {
        const data = await listarDocentes();
        if (componenteActivo) {
          setDocentes(data);
          setError("");
        }
      } catch {
        if (componenteActivo) {
          setError("No se pudo cargar docentes desde el backend.");
        }
      }
    }

    cargarInicial();

    return () => {
      componenteActivo = false;
    };
  }, []);

  const limpiar = () => {
    setForm(FORM_INICIAL);
    setEditId(null);
  };

  const guardar = async (e) => {
    e.preventDefault();
    const data = { ...form, disponible: form.disponible === true || form.disponible === "true" };

    try {
      if (editId) {
        await actualizarDocente(editId, data);
      } else {
        await crearDocente(data);
      }
      limpiar();
      cargar();
    } catch {
      setError("No se pudo guardar el docente. Revisa los datos.");
    }
  };

  const editar = (item) => {
    setEditId(item.id);
    setForm({
      nombre: item.nombre || "",
      especialidad: item.especialidad || "",
      correo: item.correo || "",
      telefono: item.telefono || "",
      disponible: item.disponible ?? true,
    });
  };

  const borrar = async (id) => {
    if (confirm("¿Eliminar este docente?")) {
      await eliminarDocente(id);
      cargar();
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Gestión de docentes</h1>
        <p>Administración de plantel docente y disponibilidad.</p>
      </div>

      <div className="page-body">
        <form className="form-panel" onSubmit={guardar}>
          <h2>{editId ? "Editar docente" : "Nuevo docente"}</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nombre del docente"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Especialidad"
              value={form.especialidad}
              onChange={(e) => setForm({ ...form, especialidad: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Correo institucional"
              value={form.correo}
              onChange={(e) => setForm({ ...form, correo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
            <select
              value={form.disponible}
              onChange={(e) => setForm({ ...form, disponible: e.target.value === "true" })}
            >
              <option value="true">Disponible</option>
              <option value="false">No disponible</option>
            </select>
          </div>

          <div className="actions-row">
            <button className="primary-btn" type="submit">
              {editId ? "Actualizar" : "Guardar"}
            </button>
            {editId && (
              <button className="secondary-btn" type="button" onClick={limpiar}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {error && <div className="error-state">{error}</div>}

        <div className="data-grid">
          {docentes.length === 0 && !error && (
            <div className="empty-state">No hay docentes registrados.</div>
          )}

          {docentes.map((item) => (
            <article className="info-card" key={item.id}>
              <h3>{item.nombre}</h3>
              <p><strong>Especialidad:</strong> {item.especialidad}</p>
              <p><strong>Correo:</strong> {item.correo || "Sin correo"}</p>
              <p><strong>Teléfono:</strong> {item.telefono || "Sin teléfono"}</p>
              <span className={item.disponible ? "badge" : "badge off"}>
                {item.disponible ? "Disponible" : "No disponible"}
              </span>
              <div className="card-actions">
                <button className="secondary-btn" onClick={() => editar(item)}>Editar</button>
                <button className="danger-btn" onClick={() => borrar(item.id)}>Eliminar</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Docentes;

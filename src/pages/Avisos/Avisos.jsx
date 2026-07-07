import { useEffect, useState } from "react";
import {
  actualizarAviso,
  crearAviso,
  eliminarAviso,
  listarAvisos,
} from "../../services/avisoService.js";

const FORM_INICIAL = {
  titulo: "",
  contenido: "",
  categoria: "General",
  fechaPublicacion: "",
  visible: true,
};

function Avisos() {
  const [avisos, setAvisos] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setAvisos(await listarAvisos());
      setError("");
    } catch {
      setError("No se pudo cargar avisos desde el backend.");
    }
  };

  useEffect(() => {
    let componenteActivo = true;

    async function cargarInicial() {
      try {
        const data = await listarAvisos();
        if (componenteActivo) {
          setAvisos(data);
          setError("");
        }
      } catch {
        if (componenteActivo) {
          setError("No se pudo cargar avisos desde el backend.");
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
    const data = {
      ...form,
      fechaPublicacion: form.fechaPublicacion || null,
      visible: form.visible === true || form.visible === "true",
    };

    try {
      if (editId) {
        await actualizarAviso(editId, data);
      } else {
        await crearAviso(data);
      }
      limpiar();
      cargar();
    } catch {
      setError("No se pudo guardar el aviso. Revisa los datos.");
    }
  };

  const editar = (item) => {
    setEditId(item.id);
    setForm({
      titulo: item.titulo || "",
      contenido: item.contenido || "",
      categoria: item.categoria || "General",
      fechaPublicacion: item.fechaPublicacion || "",
      visible: item.visible ?? true,
    });
  };

  const borrar = async (id) => {
    if (confirm("¿Eliminar este aviso?")) {
      await eliminarAviso(id);
      cargar();
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Gestión de avisos</h1>
        <p>Publicación de comunicados y avisos institucionales.</p>
      </div>

      <div className="page-body">
        <form className="form-panel" onSubmit={guardar}>
          <h2>{editId ? "Editar aviso" : "Nuevo aviso"}</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Título del aviso"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
            />
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            >
              <option value="General">General</option>
              <option value="Académico">Académico</option>
              <option value="Comunicado">Comunicado</option>
              <option value="Urgente">Urgente</option>
            </select>
            <input
              type="date"
              value={form.fechaPublicacion}
              onChange={(e) => setForm({ ...form, fechaPublicacion: e.target.value })}
            />
            <select
              value={form.visible}
              onChange={(e) => setForm({ ...form, visible: e.target.value === "true" })}
            >
              <option value="true">Visible</option>
              <option value="false">Oculto</option>
            </select>
            <textarea
              className="full"
              placeholder="Contenido del aviso"
              value={form.contenido}
              onChange={(e) => setForm({ ...form, contenido: e.target.value })}
              required
            />
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
          {avisos.length === 0 && !error && (
            <div className="empty-state">No hay avisos registrados.</div>
          )}

          {avisos.map((item) => (
            <article className="info-card" key={item.id}>
              <h3>{item.titulo}</h3>
              <p>{item.contenido}</p>
              <p><strong>Categoría:</strong> {item.categoria || "General"}</p>
              <p><strong>Fecha:</strong> {item.fechaPublicacion || "Sin fecha"}</p>
              <span className={item.visible ? "badge" : "badge off"}>
                {item.visible ? "Visible" : "Oculto"}
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

export default Avisos;

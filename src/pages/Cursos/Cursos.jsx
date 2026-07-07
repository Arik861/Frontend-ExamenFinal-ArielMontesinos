import { useEffect, useState } from "react";
import {
  actualizarCurso,
  crearCurso,
  eliminarCurso,
  listarCursos,
} from "../../services/cursoService.js";

const FORM_INICIAL = {
  nombre: "",
  turno: "Mañana",
  cupo: "",
  aula: "",
};

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setCursos(await listarCursos());
      setError("");
    } catch {
      setError("No se pudo cargar cursos desde el backend.");
    }
  };

  useEffect(() => {
    let componenteActivo = true;

    async function cargarInicial() {
      try {
        const data = await listarCursos();
        if (componenteActivo) {
          setCursos(data);
          setError("");
        }
      } catch {
        if (componenteActivo) {
          setError("No se pudo cargar cursos desde el backend.");
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
    const data = { ...form, cupo: Number(form.cupo) };

    try {
      if (editId) {
        await actualizarCurso(editId, data);
      } else {
        await crearCurso(data);
      }
      limpiar();
      cargar();
    } catch {
      setError("No se pudo guardar el curso. Revisa los datos.");
    }
  };

  const editar = (item) => {
    setEditId(item.id);
    setForm({
      nombre: item.nombre || "",
      turno: item.turno || "Mañana",
      cupo: item.cupo || "",
      aula: item.aula || "",
    });
  };

  const borrar = async (id) => {
    if (confirm("¿Eliminar este curso?")) {
      await eliminarCurso(id);
      cargar();
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Gestión de cursos</h1>
        <p>Administración de cursos, turnos, cupos y aulas.</p>
      </div>

      <div className="page-body">
        <form className="form-panel" onSubmit={guardar}>
          <h2>{editId ? "Editar curso" : "Nuevo curso"}</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nombre del curso"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
            />
            <select
              value={form.turno}
              onChange={(e) => setForm({ ...form, turno: e.target.value })}
              required
            >
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>
            <input
              type="number"
              min="1"
              placeholder="Cupo"
              value={form.cupo}
              onChange={(e) => setForm({ ...form, cupo: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Aula"
              value={form.aula}
              onChange={(e) => setForm({ ...form, aula: e.target.value })}
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
          {cursos.length === 0 && !error && (
            <div className="empty-state">No hay cursos registrados.</div>
          )}

          {cursos.map((item) => (
            <article className="info-card" key={item.id}>
              <h3>{item.nombre}</h3>
              <p><strong>Turno:</strong> {item.turno}</p>
              <p><strong>Cupo:</strong> {item.cupo} estudiantes</p>
              <p><strong>Aula:</strong> {item.aula || "Sin aula asignada"}</p>
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

export default Cursos;

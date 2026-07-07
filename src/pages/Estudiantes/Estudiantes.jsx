import { useEffect, useState } from "react";
import {
  actualizarEstudiante,
  crearEstudiante,
  eliminarEstudiante,
  listarEstudiantes,
} from "../../services/estudianteService.js";

const FORM_INICIAL = {
  nombreCompleto: "",
  curso: "",
  edad: "",
  correoTutor: "",
  activo: true,
};

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setEstudiantes(await listarEstudiantes());
      setError("");
    } catch {
      setError("No se pudo cargar estudiantes desde el backend.");
    }
  };

  useEffect(() => {
    let componenteActivo = true;

    async function cargarInicial() {
      try {
        const data = await listarEstudiantes();
        if (componenteActivo) {
          setEstudiantes(data);
          setError("");
        }
      } catch {
        if (componenteActivo) {
          setError("No se pudo cargar estudiantes desde el backend.");
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
    const data = { ...form, edad: Number(form.edad), activo: form.activo === true || form.activo === "true" };

    try {
      if (editId) {
        await actualizarEstudiante(editId, data);
      } else {
        await crearEstudiante(data);
      }
      limpiar();
      cargar();
    } catch {
      setError("No se pudo guardar el estudiante. Revisa los datos.");
    }
  };

  const editar = (item) => {
    setEditId(item.id);
    setForm({
      nombreCompleto: item.nombreCompleto || "",
      curso: item.curso || "",
      edad: item.edad || "",
      correoTutor: item.correoTutor || "",
      activo: item.activo ?? true,
    });
  };

  const borrar = async (id) => {
    if (confirm("¿Eliminar este estudiante?")) {
      await eliminarEstudiante(id);
      cargar();
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Gestión de estudiantes</h1>
        <p>Registro, edición y control de estudiantes activos.</p>
      </div>

      <div className="page-body">
        <form className="form-panel" onSubmit={guardar}>
          <h2>{editId ? "Editar estudiante" : "Nuevo estudiante"}</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nombre completo"
              value={form.nombreCompleto}
              onChange={(e) => setForm({ ...form, nombreCompleto: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Curso"
              value={form.curso}
              onChange={(e) => setForm({ ...form, curso: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Edad"
              min="1"
              value={form.edad}
              onChange={(e) => setForm({ ...form, edad: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Correo del tutor"
              value={form.correoTutor}
              onChange={(e) => setForm({ ...form, correoTutor: e.target.value })}
            />
            <select
              value={form.activo}
              onChange={(e) => setForm({ ...form, activo: e.target.value === "true" })}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
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
          {estudiantes.length === 0 && !error && (
            <div className="empty-state">No hay estudiantes registrados.</div>
          )}

          {estudiantes.map((item) => (
            <article className="info-card" key={item.id}>
              <h3>{item.nombreCompleto}</h3>
              <p><strong>Curso:</strong> {item.curso}</p>
              <p><strong>Edad:</strong> {item.edad}</p>
              <p><strong>Correo tutor:</strong> {item.correoTutor || "Sin correo"}</p>
              <span className={item.activo ? "badge" : "badge off"}>
                {item.activo ? "Activo" : "Inactivo"}
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

export default Estudiantes;

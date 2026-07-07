import { useEffect, useState } from "react";
import { FaBell, FaChalkboardTeacher, FaLayerGroup, FaServer, FaUserGraduate } from "react-icons/fa";
import { API_BASE_URL } from "../../services/apiClient.js";
import { listarAvisos } from "../../services/avisoService.js";
import { listarCursos } from "../../services/cursoService.js";
import { listarDocentes } from "../../services/docenteService.js";
import { listarEstudiantes } from "../../services/estudianteService.js";
import "./Home.css";

function Home() {
  const [resumen, setResumen] = useState({
    estudiantes: 0,
    docentes: 0,
    cursos: 0,
    avisos: 0,
  });

  useEffect(() => {
    async function cargarResumen() {
      try {
        const [estudiantes, docentes, cursos, avisos] = await Promise.all([
          listarEstudiantes(),
          listarDocentes(),
          listarCursos(),
          listarAvisos(),
        ]);

        setResumen({
          estudiantes: estudiantes.length,
          docentes: docentes.length,
          cursos: cursos.length,
          avisos: avisos.length,
        });
      } catch {
        setResumen({
          estudiantes: 0,
          docentes: 0,
          cursos: 0,
          avisos: 0,
        });
      }
    }

    cargarResumen();
  }, []);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <span className="hero-label">Sistema escolar</span>
          <h1>Panel de gestión del Colegio Carlos Medinaceli</h1>
          <p>
            Frontend conectado al backend publicado en Render para administrar
            estudiantes, docentes, cursos y avisos institucionales.
          </p>
        </div>
      </section>

      <section className="summary-grid">
        <div className="summary-card">
          <FaUserGraduate />
          <strong>{resumen.estudiantes}</strong>
          <span>Estudiantes</span>
        </div>
        <div className="summary-card">
          <FaChalkboardTeacher />
          <strong>{resumen.docentes}</strong>
          <span>Docentes</span>
        </div>
        <div className="summary-card">
          <FaLayerGroup />
          <strong>{resumen.cursos}</strong>
          <span>Cursos</span>
        </div>
        <div className="summary-card">
          <FaBell />
          <strong>{resumen.avisos}</strong>
          <span>Avisos</span>
        </div>
      </section>

      <section className="connection-card">
        <FaServer />
        <div>
          <h2>Conexión del backend</h2>
          <p>{API_BASE_URL}</p>
        </div>
      </section>
    </div>
  );
}

export default Home;

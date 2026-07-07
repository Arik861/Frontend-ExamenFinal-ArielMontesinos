import { NavLink } from "react-router-dom";
import {
  FaBell,
  FaBookOpen,
  FaChalkboardTeacher,
  FaHome,
  FaLayerGroup,
  FaSchool,
  FaUserGraduate,
  FaUserLock,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <FaSchool />
        <span>Menú principal</span>
      </div>

      <NavLink to="/">
        <FaHome /> Inicio
      </NavLink>
      <NavLink to="/historia">
        <FaBookOpen /> Historia
      </NavLink>
      <NavLink to="/estudiantes">
        <FaUserGraduate /> Estudiantes
      </NavLink>
      <NavLink to="/docentes">
        <FaChalkboardTeacher /> Docentes
      </NavLink>
      <NavLink to="/cursos">
        <FaLayerGroup /> Cursos
      </NavLink>
      <NavLink to="/avisos">
        <FaBell /> Avisos
      </NavLink>
      <NavLink to="/login">
        <FaUserLock /> Login
      </NavLink>

      <div className="sidebar-note">
        <strong>Gestión 2026</strong>
        <p>Sistema académico conectado al backend en Render.</p>
      </div>
    </aside>
  );
}

export default Sidebar;

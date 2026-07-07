import { Link } from "react-router-dom";
import { FaGraduationCap, FaUserShield } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <header className="top-header">
      <div className="brand-box">
        <div className="brand-icon">
          <FaGraduationCap />
        </div>
        <div>
          <p>Unidad Educativa</p>
          <h1>Carlos Medinaceli</h1>
          <span>Panel académico institucional</span>
        </div>
      </div>

      <Link to="/login" className="login-link">
        <FaUserShield />
        Acceso
      </Link>
    </header>
  );
}

export default Header;

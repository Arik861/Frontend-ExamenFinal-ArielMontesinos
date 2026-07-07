import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { iniciarSesion } from "../../services/accesoService.js";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ usuario: "", clave: "" });
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const acceder = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      const respuesta = await iniciarSesion(form);

      if (respuesta.acceso) {
        localStorage.setItem("sesionColegio", JSON.stringify(respuesta));
        navigate("/");
      } else {
        setMensaje(respuesta.mensaje || "Usuario o clave incorrectos");
      }
    } catch {
      setMensaje("No se pudo conectar con el servicio de acceso.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <FaLock />
        </div>
        <h1>Ingreso administrativo</h1>
        <p>Utiliza el usuario asignado para acceder al panel escolar.</p>

        <form onSubmit={acceder}>
          <input
            type="text"
            placeholder="Usuario"
            value={form.usuario}
            onChange={(e) => setForm({ ...form, usuario: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Clave"
            value={form.clave}
            onChange={(e) => setForm({ ...form, clave: e.target.value })}
            required
          />

          <button className="primary-btn" type="submit" disabled={cargando}>
            {cargando ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        {mensaje && <div className="login-error">{mensaje}</div>}

        <div className="login-help">
          Usuario de prueba: <strong>ariel_admin</strong> · Clave:{" "}
          <strong>1234</strong>
        </div>
      </div>
    </div>
  );
}

export default Login;

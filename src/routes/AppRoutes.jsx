import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import Historia from "../pages/Historia/Historia.jsx";
import Login from "../pages/Login/Login.jsx";
import Estudiantes from "../pages/Estudiantes/Estudiantes.jsx";
import Docentes from "../pages/Docentes/Docentes.jsx";
import Cursos from "../pages/Cursos/Cursos.jsx";
import Avisos from "../pages/Avisos/Avisos.jsx";

function AppRoutes() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/estudiantes" element={<Estudiantes />} />
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default AppRoutes;

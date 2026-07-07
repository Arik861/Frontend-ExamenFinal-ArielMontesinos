import Header from "../Header/Header.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="site-shell">
      <div className="site-card">
        <Header />

        <main className="main-layout">
          <Sidebar />
          <section className="content-box">{children}</section>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default Layout;

import "./Historia.css";

function Historia() {
  return (
    <div className="historia-page">
      <div className="page-title">
        <h1>Historia institucional</h1>
        <p>Reseña, misión, visión y valores del Colegio Carlos Medinaceli.</p>
      </div>

      <div className="historia-body">
        <section className="history-card main-history">
          <h2>Colegio Carlos Medinaceli</h2>
          <p>
            El Colegio Carlos Medinaceli forma parte de la tradición educativa
            potosina y mantiene una labor orientada a la formación académica,
            cultural y humana de sus estudiantes.
          </p>
          <p>
            La institución impulsa la responsabilidad, el respeto, la disciplina
            y el compromiso social como principios centrales para la comunidad
            educativa.
          </p>
        </section>

        <section className="history-grid">
          <div className="history-card">
            <h3>Misión</h3>
            <p>
              Brindar educación integral, fortaleciendo conocimientos, valores y
              habilidades para la participación responsable en la sociedad.
            </p>
          </div>

          <div className="history-card">
            <h3>Visión</h3>
            <p>
              Consolidarse como una unidad educativa reconocida por su calidad,
              innovación y compromiso con la juventud potosina.
            </p>
          </div>

          <div className="history-card">
            <h3>Valores</h3>
            <div className="values">
              <span>Respeto</span>
              <span>Responsabilidad</span>
              <span>Disciplina</span>
              <span>Solidaridad</span>
              <span>Honestidad</span>
              <span>Compromiso</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Historia;

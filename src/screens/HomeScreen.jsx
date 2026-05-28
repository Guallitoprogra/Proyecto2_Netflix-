import { useEffect } from "react";
import { Bookmark, Clapperboard, Play, Search, Settings2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PosterCard from "../components/PosterCard";
import SectionHeading from "../components/SectionHeading";
import { formatProgress } from "../lib/copy";
import { useAppModel } from "../lib/app-model";

const MAIN_ACTIONS = [
  {
    id: "buscar",
    label: "Buscar",
    description: "Encuentra una película por nombre, idioma o género.",
    path: "/buscar",
    icon: Search,
  },
  {
    id: "clasicos",
    label: "Películas clásicas",
    description: "Opciones conocidas y fáciles de reconocer.",
    path: "/categorias?collection=clasicos&scope=pelicula",
    icon: Clapperboard,
  },
  {
    id: "guardados",
    label: "Guardados",
    description: "Vuelve a lo que marcaste para ver después.",
    path: "/?focus=favoritos",
    icon: Bookmark,
  },
  {
    id: "senior-mode",
    label: "Senior Mode",
    description: "Aumenta texto y activa ayudas accesibles.",
    path: "/configuracion",
    icon: Settings2,
  },
];

function QuickTile({ item, onClick }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      className="quick-tile"
      onClick={() => onClick(item.path)}
      data-voice={`${item.label}. ${item.description}`}
    >
      <span className="tile-icon" aria-hidden="true">
        <Icon size={24} strokeWidth={2.4} />
      </span>
      <span>{item.label}</span>
      <small>{item.description}</small>
    </button>
  );
}

function EmptyFavorites() {
  const app = useAppModel();

  return (
    <div className="empty-state">
      <img src={app.logoImage} alt="" aria-hidden="true" />
      <div>
        <h3>No hay películas guardadas</h3>
        <p>Usa “Guardar para después” en cualquier película para verla aquí.</p>
      </div>
    </div>
  );
}

export default function HomeScreen() {
  const app = useAppModel();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const heroTitle = app.lastOpenedTitle ?? app.recommended[0];
  const focusTarget = searchParams.get("focus");

  useEffect(() => {
    if (!focusTarget) {
      return;
    }

    const target = document.getElementById(focusTarget);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [focusTarget]);

  function openPath(path) {
    navigate(path);
  }

  function openTitle(id) {
    app.openTitle(id);
    navigate(`/detalle/${id}`);
  }

  function openPlayer() {
    if (!heroTitle) {
      navigate("/buscar");
      return;
    }

    app.openTitle(heroTitle.id);
    navigate(`/reproducir/${heroTitle.id}`);
  }

  return (
    <>
      <section
        className="hero-panel"
        style={{
          backgroundImage: heroTitle ? `url(${heroTitle.image})` : undefined,
        }}
      >
        <div className="hero-copy">
          <p className="section-eyebrow">Netflix Senior Mode v2</p>
          <h2>Elige, busca y reproduce con pasos claros.</h2>
          <p>Versión mejorada con texto grande, contraste alto y menos categorías para evitar confusión.</p>
          <div className="hero-actions">
            <button
              type="button"
              className="primary-button"
              onClick={openPlayer}
              data-voice="Reproducir ahora"
            >
              <Play size={22} strokeWidth={2.4} />
              Reproducir
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/buscar")}
              data-voice="Buscar pelicula"
            >
              <Search size={22} strokeWidth={2.4} />
              Buscar película
            </button>
          </div>
        </div>
        <div className="hero-highlight">
          <span className="section-eyebrow">Sugerencia clara</span>
          {heroTitle ? (
            <>
              <h3>{heroTitle.title}</h3>
              <p>{heroTitle.reason}</p>
              <div className="hero-meta">
                <span>{heroTitle.language}</span>
                <span>{heroTitle.duration}</span>
                <span>{heroTitle.subtitles}</span>
              </div>
              <div className="hero-status">
                <strong>Último avance</strong>
                <p>
                  {heroTitle.progress > 0
                    ? formatProgress(heroTitle.progress)
                    : "Listo para empezar"}
                </p>
              </div>
            </>
          ) : (
            <p>Busca una opción para empezar.</p>
          )}
        </div>
      </section>

      <section className="panel-surface">
        <SectionHeading
          eyebrow="Acciones principales"
          title="Todo lo importante está visible"
          description="Menos opciones en pantalla para reconocer las funciones sin memorizar ubicaciones."
        />
        {/* Cambio realizado para simplificar la pantalla principal y reducir carga cognitiva. */}
        <div className="quick-grid quick-grid--simple">
          {MAIN_ACTIONS.map((item) => (
            <QuickTile key={item.id} item={item} onClick={openPath} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Recomendado para ti"
          title="Recomendado para ti"
          description="Pocas opciones, con idioma, duración y subtítulos visibles antes de entrar."
        />
        <div className="poster-grid">
          {app.recommended.slice(0, 4).map((title) => (
            <PosterCard
              key={title.id}
              title={title}
              onOpen={openTitle}
              onFavoriteToggle={app.toggleFavorite}
            />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Películas clásicas"
          title="Películas clásicas"
          description="Títulos familiares y fáciles de comparar para decidir con calma."
        />
        <div className="poster-grid">
          {app.classicPicks.slice(0, 4).map((title) => (
            <PosterCard
              key={title.id}
              title={title}
              onOpen={openTitle}
              onFavoriteToggle={app.toggleFavorite}
              compact
            />
          ))}
        </div>
      </section>

      {app.continueWatching.length ? (
        <section id="continuar" className="content-section">
          <SectionHeading
            eyebrow="Seguir viendo"
            title="Retoma donde te quedaste"
            description="Tus avances se guardan en este navegador."
          />
          <div className="poster-grid">
            {app.continueWatching.slice(0, 3).map((title) => (
              <PosterCard
                key={title.id}
                title={title}
                onOpen={openTitle}
                onFavoriteToggle={app.toggleFavorite}
                compact
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="content-section" id="favoritos">
        <SectionHeading
          eyebrow="Guardados"
          title="Guardados para después"
          description="Todo lo que guardes aparece aquí."
        />
        {app.favoriteTitles.length ? (
          <div className="poster-grid">
            {app.favoriteTitles.map((title) => (
              <PosterCard
                key={title.id}
                title={title}
                onOpen={openTitle}
                onFavoriteToggle={app.toggleFavorite}
                compact
              />
            ))}
          </div>
        ) : (
          <EmptyFavorites />
        )}
      </section>
    </>
  );
}

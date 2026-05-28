import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CaseSensitive,
  CircleHelp,
  Clock3,
  House,
  Play,
  Search,
  Settings2,
  Shapes,
} from "lucide-react";
import { HELP_TIPS } from "../data/catalog";
import { formatProgress } from "../lib/copy";
import { useAppModel } from "../lib/app-model";
import { useVoiceGuidance } from "../hooks/useVoiceGuidance";

const ROUTE_META = [
  {
    match: (path) => path === "/",
    title: "Senior Mode v2",
    description: "Tus opciones principales, sin ruido.",
  },
  {
    match: (path) => path.startsWith("/categorias"),
    title: "Categorías",
    description: "Explora pocas categorías claras.",
  },
  {
    match: (path) => path.startsWith("/buscar"),
    title: "Buscar",
    description: "Encuentra por título, idioma o género.",
  },
  {
    match: (path) => path.startsWith("/configuracion"),
    title: "Senior Mode",
    description: "Texto grande, vista accesible y subtítulos.",
  },
  {
    match: (path) => path.startsWith("/detalle"),
    title: "Detalle",
    description: "Resumen claro y acciones principales al frente.",
  },
  {
    match: (path) => path.startsWith("/reproducir"),
    title: "Reproducir",
    description: "Controles grandes y fáciles de reconocer.",
  },
];

const NAV_ITEMS = [
  { to: "/", label: "Inicio", icon: House },
  { to: "/categorias", label: "Categorías", icon: Shapes },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/configuracion", label: "Senior Mode", icon: Settings2 },
];

function NavigationItems({ mobile = false }) {
  return NAV_ITEMS.map(({ to, label, icon: Icon }) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        `${mobile ? "bottom-link" : "nav-link"} ${isActive ? "is-active" : ""}`
      }
      data-voice={label}
    >
      <Icon size={22} strokeWidth={2.4} />
      <span>{label}</span>
    </NavLink>
  ));
}

function HelpPanel({ onClose }) {
  return (
    <div className="help-panel" role="dialog" aria-modal="true" aria-label="Ayuda rápida">
      <div className="help-card">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Ayuda</p>
            <h2>Cómo usar Senior Mode v2</h2>
            <p>Busca, reproduce, guarda para después y usa Regresar cuando quieras volver.</p>
          </div>
          <button
            type="button"
            className="ghost-button"
            onClick={onClose}
            data-voice="Cerrar ayuda"
          >
            Cerrar
          </button>
        </div>
        <ul className="help-list">
          {HELP_TIPS.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AppShell() {
  const app = useAppModel();
  const location = useLocation();
  const navigate = useNavigate();
  const routeMeta =
    ROUTE_META.find((item) => item.match(location.pathname)) ?? ROUTE_META[0];
  const [helpOpen, setHelpOpen] = app.helpState;

  useVoiceGuidance({
    enabled: app.settings.voiceGuidance,
    routeMessage: `${routeMeta.title}. ${routeMeta.description}`,
  });

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  function increaseTextSize() {
    // Cambio realizado para mejorar la accesibilidad en adultos mayores: el ajuste de texto queda siempre visible.
    const nextScale =
      app.settings.textScale === "normal"
        ? "grande"
        : app.settings.textScale === "grande"
          ? "extra"
          : "extra";

    app.updateSettings({ textScale: nextScale });
    app.notify(nextScale === "extra" ? "Texto aumentado al máximo" : "Texto aumentado");
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido principal
      </a>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-logo-anchor">
            <img
              className="sidebar-logo-anchor__img"
              src={app.logoImage}
              alt="Netflix Senior Mode"
            />
          </div>
          <div className="brand-card">
            <div className="brand-copy">
              <p className="section-eyebrow">Senior Mode activo</p>
              <h1>Netflix Senior Mode v2</h1>
              <p>Texto grande, búsqueda visible y acciones reconocibles.</p>
            </div>
          </div>

          <nav className="sidebar-nav" aria-label="Navegación principal">
            <NavigationItems />
          </nav>

          <div className="support-panel">
            {app.lastOpenedTitle ? (
              <button
                type="button"
                className="resume-card"
                onClick={() => navigate(`/detalle/${app.lastOpenedTitle.id}`)}
                data-voice={`Volver a ${app.lastOpenedTitle.title}`}
              >
                <div>
                  <p className="section-eyebrow">Último título</p>
                  <strong>{app.lastOpenedTitle.title}</strong>
                  <span>
                    {app.lastOpenedTitle.progress > 0
                      ? formatProgress(app.lastOpenedTitle.progress)
                      : "Listo para empezar"}
                  </span>
                </div>
                <span className="resume-icon" aria-hidden="true">
                  <Play size={18} strokeWidth={2.4} />
                </span>
              </button>
            ) : null}
            <p className="section-eyebrow">Accesibilidad</p>
            <strong>Senior Mode</strong>
            <span>Activo para adultos mayores 60+</span>
            <strong>Subtítulos automáticos</strong>
            <span>{app.settings.autoSubtitles ? "Activados" : "Desactivados"}</span>
            <strong>Atajo</strong>
            <span>
              <Clock3 size={15} strokeWidth={2.2} /> Presiona <kbd>/</kbd> para buscar
            </span>
          </div>
        </aside>

        <div className="main-column">
          <header className="topbar">
            <div className="topbar-copy">
              {location.pathname !== "/" ? (
                <button
                  type="button"
                  className="back-button"
                  onClick={handleBack}
                  data-voice="Volver"
                >
                  <ArrowLeft size={20} strokeWidth={2.4} />
                  <span>Volver</span>
                </button>
              ) : null}
              <div>
                <p className="section-eyebrow">{routeMeta.title}</p>
                <h2>{routeMeta.description}</h2>
              </div>
            </div>
            <div className="topbar-actions">
              {/* Cambio realizado para que Buscar sea reconocible y no dependa de recordar su ubicación. */}
              <button
                type="button"
                className="primary-button topbar-search-button"
                onClick={() => navigate("/buscar")}
                data-voice="Buscar película o serie"
              >
                <Search size={20} strokeWidth={2.4} />
                <span>Buscar</span>
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={increaseTextSize}
                data-voice="Aumentar texto"
              >
                <CaseSensitive size={20} strokeWidth={2.4} />
                <span>Aumentar texto</span>
              </button>
              <button
                type="button"
                className="help-button"
                onClick={() => setHelpOpen(true)}
                data-voice="Abrir ayuda"
              >
                <CircleHelp size={20} strokeWidth={2.2} />
                <span>Ayuda</span>
              </button>
            </div>
          </header>

          <main className="screen" id="main-content">
            <Outlet />
          </main>

          <nav className="bottom-nav" aria-label="Navegación móvil">
            <NavigationItems mobile />
          </nav>
        </div>

        {helpOpen ? <HelpPanel onClose={() => setHelpOpen(false)} /> : null}
        {app.notification ? (
          <div className="toast-message" role="status" aria-live="polite">
            {app.notification}
          </div>
        ) : null}
      </div>
    </>
  );
}

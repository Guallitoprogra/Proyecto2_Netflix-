import SectionHeading from "../components/SectionHeading";
import { useAppModel } from "../lib/app-model";

const TEXT_OPTIONS = [
  { id: "normal", label: "Grande", description: "Texto claro para lectura diaria" },
  { id: "grande", label: "Más grande", description: "Botones y títulos más cómodos" },
  { id: "extra", label: "Vista accesible", description: "Máxima legibilidad para Senior Mode" },
];

const MOTION_OPTIONS = [
  { id: "suave", label: "Suave", description: "Transiciones cortas" },
  { id: "calmado", label: "Calmado", description: "Menos movimiento" },
  { id: "minimo", label: "Mínimo", description: "Casi sin movimiento" },
];

function OptionGroup({ title, description, items, value, onChange }) {
  return (
    <section className="settings-group">
      <SectionHeading title={title} description={description} />
      <div className="option-grid">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`settings-option ${value === item.id ? "is-active" : ""}`}
            onClick={() => onChange(item.id, item.label)}
            data-voice={`${item.label}. ${item.description}`}
          >
            <strong>{item.label}</strong>
            <span>{item.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ToggleRow({ title, description, checked, onChange, voiceLabel }) {
  return (
    <button
      type="button"
      className={`toggle-row ${checked ? "is-active" : ""}`}
      onClick={onChange}
      data-voice={voiceLabel}
    >
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <span className="toggle-pill" aria-hidden="true">
        <span />
      </span>
    </button>
  );
}

export default function SettingsScreen() {
  const app = useAppModel();

  function previewVoice() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      app.notify("La lectura por voz no está disponible en este navegador");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      "Netflix Senior Mode v2. Navegación clara y lista para usar.",
    );
    utterance.lang = "es-ES";
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    app.notify("Probando lectura por voz");
  }

  return (
    <>
      <section className="panel-surface">
        <SectionHeading
          eyebrow="Senior Mode"
          title="Modo fácil y vista accesible"
          description="Ajustes visibles para texto, movimiento, subtítulos y ayuda por voz."
        />
      </section>

      <OptionGroup
        title="Aumentar texto"
        description="Elige el tamaño de lectura para toda la interfaz."
        items={TEXT_OPTIONS}
        value={app.settings.textScale}
        onChange={(value, label) => {
          // Cambio realizado para mejorar la accesibilidad en adultos mayores: control visible de tamaño de texto.
          app.updateSettings({ textScale: value });
          app.notify(`Tamaño de texto: ${label}`);
        }}
      />

      <OptionGroup
        title="Vista tranquila"
        description="Reduce animaciones para evitar distracciones."
        items={MOTION_OPTIONS}
        value={app.settings.motionLevel}
        onChange={(value, label) => {
          app.updateSettings({ motionLevel: value });
          app.notify(`Movimiento: ${label}`);
        }}
      />

      <section className="settings-group">
        <SectionHeading
          title="Ayudas visibles"
          description="Opciones para leer, orientarte y controlar la app con más facilidad."
        />
        <div className="toggle-grid">
          <ToggleRow
            title="Subtítulos automáticos"
            description="Activa subtítulos al empezar a reproducir."
            checked={app.settings.autoSubtitles}
            onChange={() => {
              const nextValue = !app.settings.autoSubtitles;
              app.updateSettings({ autoSubtitles: nextValue });
              app.notify(nextValue ? "Subtítulos activados" : "Subtítulos desactivados");
            }}
            voiceLabel={
              app.settings.autoSubtitles
                ? "Desactivar subtítulos automáticos"
                : "Activar subtítulos automáticos"
            }
          />
          <ToggleRow
            title="Lectura por voz"
            description="Lee encabezados y botones al navegar con teclado."
            checked={app.settings.voiceGuidance}
            onChange={() => {
              const nextValue = !app.settings.voiceGuidance;
              app.updateSettings({ voiceGuidance: nextValue });
              app.notify(nextValue ? "Lectura por voz activada" : "Lectura por voz desactivada");
            }}
            voiceLabel={
              app.settings.voiceGuidance
                ? "Desactivar lectura por voz"
                : "Activar lectura por voz"
            }
          />
        </div>
        <button
          type="button"
          className="ghost-button"
          onClick={previewVoice}
          data-voice="Probar lectura por voz"
        >
          Probar lectura por voz
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={() => {
            app.clearSearchHistory();
            app.notify("Búsquedas recientes borradas");
          }}
          data-voice="Borrar búsquedas recientes"
        >
          Borrar búsquedas recientes
        </button>
        <button
          type="button"
          className="ghost-button"
          onClick={() => {
            app.resetExperience();
            app.notify("Senior Mode volvió a la configuración inicial");
          }}
          data-voice="Borrar datos guardados"
        >
          Restablecer Senior Mode
        </button>
      </section>
    </>
  );
}
